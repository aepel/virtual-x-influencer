import { Injectable, Inject } from '@nestjs/common';
import { Thread } from '../../domain/entities/thread.entity';
import { Post } from '../../domain/entities/post.entity';
import { ITopicRepository } from '../../domain/repositories/topic.repository.interface';
import { IThreadRepository } from '../../domain/repositories/thread.repository.interface';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';
import { IGrokContentGenerationService } from '../../domain/services/grok-content-generation.service.interface';
import { TOPIC_REPOSITORY, GROK_SERVICE } from '../../app.module';

export interface CreateThreadRequest {
  topicId: string;
  threadSize?: number;
}

export interface CreateThreadResponse {
  thread: Thread;
  posts: Post[];
}

@Injectable()
export class CreateThreadUseCase {
  constructor(
    @Inject(TOPIC_REPOSITORY)
    private readonly topicRepository: ITopicRepository,
    private readonly threadRepository: IThreadRepository,
    private readonly postRepository: IPostRepository,
    @Inject(GROK_SERVICE)
    private readonly grokService: IGrokContentGenerationService,
  ) {}

  async execute(request: CreateThreadRequest): Promise<CreateThreadResponse> {
    const topic = await this.topicRepository.findById(request.topicId);
    if (!topic) {
      throw new Error('Topic not found');
    }

    const threadSize = request.threadSize || 7;
    const content = await this.grokService.generateThreadContent(
      topic.name,
      topic.category,
      threadSize,
    );

    const thread = Thread.create(request.topicId, content.title);
    const savedThread = await this.threadRepository.save(thread);

    const posts: Post[] = [];
    for (let i = 0; i < content.posts.length; i++) {
      const post = Post.create(
        savedThread.id,
        request.topicId,
        content.posts[i],
        i + 1,
      );
      const savedPost = await this.postRepository.save(post);
      posts.push(savedPost);
    }

    return {
      thread: savedThread,
      posts,
    };
  }
}
