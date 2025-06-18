import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PublishThreadUseCase } from '../../application/use-cases/publish-thread.use-case';
import { IThreadRepository } from '../../domain/repositories/thread.repository.interface';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';

@Injectable()
export class ThreadSchedulerService {
  private readonly logger = new Logger(ThreadSchedulerService.name);

  constructor(
    private readonly threadRepository: IThreadRepository,
    private readonly postRepository: IPostRepository,
    private readonly publishThreadUseCase: PublishThreadUseCase,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledThreads() {
    try {
      const scheduledThreads =
        await this.threadRepository.findByStatus('scheduled');
      const now = new Date();

      for (const thread of scheduledThreads) {
        if (thread.scheduledAt && thread.scheduledAt <= now) {
          this.logger.log(`Publishing scheduled thread: ${thread.id}`);

          try {
            await this.publishThreadUseCase.execute({ threadId: thread.id });
            this.logger.log(`Successfully published thread: ${thread.id}`);
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(
              `Failed to publish thread ${thread.id}: ${errorMessage}`,
            );

            // Mark thread as failed
            const failedThread = thread.markAsFailed();
            await this.threadRepository.save(failedThread);
          }
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error in thread scheduler: ${errorMessage}`);
    }
  }
}
