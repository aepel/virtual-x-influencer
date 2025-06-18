export interface ITwitterPublishingService {
  publishPost(content: string, replyToId?: string): Promise<string>;
  publishThread(posts: string[]): Promise<string[]>;
}
