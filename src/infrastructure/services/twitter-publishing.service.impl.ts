import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITwitterPublishingService } from '../../domain/services/twitter-publishing.service.interface';

@Injectable()
export class TwitterPublishingServiceImpl implements ITwitterPublishingService {
  constructor(private readonly configService: ConfigService) {}

  async publishPost(content: string, replyToId?: string): Promise<string> {
    // This is a mock implementation
    // In a real implementation, you would use the Twitter API v2
    console.log(`Publishing post: ${content}`);
    if (replyToId) {
      console.log(`Replying to: ${replyToId}`);
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return a mock Twitter ID
    return `mock_twitter_id_${Date.now()}`;
  }

  async publishThread(posts: string[]): Promise<string[]> {
    const twitterIds: string[] = [];
    let replyToId: string | undefined;

    for (const post of posts) {
      const twitterId = await this.publishPost(post, replyToId);
      twitterIds.push(twitterId);
      replyToId = twitterId;
    }

    return twitterIds;
  }
}
