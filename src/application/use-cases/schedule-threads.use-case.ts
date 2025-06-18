import { Injectable, Inject } from '@nestjs/common';
import { Thread } from '../../domain/entities/thread.entity';
import { ITopicRepository } from '../../domain/repositories/topic.repository.interface';
import { IThreadRepository } from '../../domain/repositories/thread.repository.interface';
import { CreateThreadUseCase } from './create-thread.use-case';
import { TOPIC_REPOSITORY } from '../../app.module';

export interface ScheduleThreadsRequest {
  postingTimes: string[]; // Format: "HH:MM"
  threadSize?: number;
}

export interface ScheduleThreadsResponse {
  scheduledThreads: Thread[];
}

@Injectable()
export class ScheduleThreadsUseCase {
  constructor(
    @Inject(TOPIC_REPOSITORY)
    private readonly topicRepository: ITopicRepository,
    private readonly threadRepository: IThreadRepository,
    private readonly createThreadUseCase: CreateThreadUseCase,
  ) {}

  async execute(
    request: ScheduleThreadsRequest,
  ): Promise<ScheduleThreadsResponse> {
    const topics = await this.topicRepository.findAll();
    if (topics.length === 0) {
      throw new Error('No topics available for scheduling');
    }

    const scheduledThreads: Thread[] = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Filter topics by current month (you can implement your own logic)
    const monthlyTopics = topics.filter((topic) => {
      const topicCreatedAt = topic.createdAt;
      if (!topicCreatedAt) return true;
      return (
        topicCreatedAt.getMonth() === currentMonth &&
        topicCreatedAt.getFullYear() === currentYear
      );
    });

    if (monthlyTopics.length === 0) {
      // If no monthly topics, use all topics
      monthlyTopics.push(...topics);
    }

    for (const postingTime of request.postingTimes) {
      // Select a random topic for this posting time
      const randomTopic =
        monthlyTopics[Math.floor(Math.random() * monthlyTopics.length)];

      // Create thread
      const createThreadResult = await this.createThreadUseCase.execute({
        topicId: randomTopic.id,
        threadSize: request.threadSize,
      });

      // Schedule the thread
      const scheduledTime = this.parseTimeToDate(postingTime);
      const scheduledThread = createThreadResult.thread.schedule(scheduledTime);
      const savedThread = await this.threadRepository.save(scheduledThread);

      scheduledThreads.push(savedThread);
    }

    return {
      scheduledThreads,
    };
  }

  private parseTimeToDate(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const scheduledDate = new Date();
    scheduledDate.setHours(hours, minutes, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (scheduledDate <= new Date()) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    return scheduledDate;
  }
}
