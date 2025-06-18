import { Post } from '../entities/post.entity';

export interface IPostRepository {
  save(post: Post): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findByThreadId(threadId: string): Promise<Post[]>;
  findByTopicId(topicId: string): Promise<Post[]>;
  findByStatus(status: string): Promise<Post[]>;
  findScheduledPosts(): Promise<Post[]>;
  findAll(): Promise<Post[]>;
  delete(id: string): Promise<void>;
}
