import { Injectable, Inject } from '@nestjs/common';
import { Thread } from '../../domain/entities/thread.entity';
import { Post } from '../../domain/entities/post.entity';
import { PostedContent } from '../../domain/entities/posted-content.entity';
import { IThreadRepository } from '../../domain/repositories/thread.repository.interface';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';
import { IPostedContentRepository } from '../../domain/repositories/posted-content.repository.interface';
import { ITwitterPublishingService } from '../../domain/services/twitter-publishing.service.interface';
import { TWITTER_SERVICE } from '../../app.module';

export interface PublishThreadRequest {
  threadId: string;
}

export interface PublishThreadResponse {
  thread: Thread;
  posts: Post[];
  twitterIds: string[];
}

@Injectable()
export class PublishThreadUseCase {
  constructor(
    private readonly threadRepository: IThreadRepository,
    private readonly postRepository: IPostRepository,
    private readonly postedContentRepository: IPostedContentRepository,
    @Inject(TWITTER_SERVICE)
    private readonly twitterService: ITwitterPublishingService,
  ) {}

  async execute(request: PublishThreadRequest): Promise<PublishThreadResponse> {
    const thread = await this.threadRepository.findById(request.threadId);
    if (!thread) {
      throw new Error('Thread not found');
    }

    if (thread.status === 'published') {
      throw new Error('Thread already published');
    }

    const posts = await this.postRepository.findByThreadId(request.threadId);
    if (posts.length === 0) {
      throw new Error('No posts found for thread');
    }

    // Check for duplicate content
    for (const post of posts) {
      const exists = await this.postedContentRepository.existsByContent(
        post.content,
      );
      if (exists) {
        throw new Error(
          `Duplicate content detected: ${post.content.substring(0, 50)}...`,
        );
      }
    }

    // Publish to Twitter
    const postContents = posts.map((post) => post.content);
    const twitterIds = await this.twitterService.publishThread(postContents);

    // Update thread status
    const publishedThread = thread.publish();
    const updatedThread = await this.threadRepository.save(publishedThread);

    // Update posts with Twitter IDs
    const updatedPosts: Post[] = [];
    for (let i = 0; i < posts.length; i++) {
      const publishedPost = posts[i].publish(twitterIds[i]);
      const updatedPost = await this.postRepository.save(publishedPost);
      updatedPosts.push(updatedPost);

      // Track posted content
      const postedContent = PostedContent.create(
        posts[i].topicId,
        posts[i].content,
        thread.id,
        posts[i].id,
      );
      await this.postedContentRepository.save(postedContent);
    }

    return {
      thread: updatedThread,
      posts: updatedPosts,
      twitterIds,
    };
  }
}
