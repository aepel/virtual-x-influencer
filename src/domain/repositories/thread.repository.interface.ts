import { Thread } from '../entities/thread.entity';

export interface IThreadRepository {
  save(thread: Thread): Promise<Thread>;
  findById(id: string): Promise<Thread | null>;
  findByTopicId(topicId: string): Promise<Thread[]>;
  findByStatus(status: string): Promise<Thread[]>;
  findScheduledThreads(): Promise<Thread[]>;
  findAll(): Promise<Thread[]>;
  delete(id: string): Promise<void>;
}
