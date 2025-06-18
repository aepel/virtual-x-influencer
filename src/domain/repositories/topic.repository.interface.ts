import { Topic } from '../entities/topic.entity';

export interface ITopicRepository {
  save(topic: Topic): Promise<Topic>;
  findById(id: string): Promise<Topic | null>;
  findByName(name: string): Promise<Topic | null>;
  findByCategory(category: 'history' | 'geography'): Promise<Topic[]>;
  findAll(): Promise<Topic[]>;
  delete(id: string): Promise<void>;
}
