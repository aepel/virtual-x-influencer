import { PostedContent } from '../entities/posted-content.entity';

export interface IPostedContentRepository {
  save(postedContent: PostedContent): Promise<PostedContent>;
  findById(id: string): Promise<PostedContent | null>;
  findByTopicId(topicId: string): Promise<PostedContent[]>;
  findByContent(content: string): Promise<PostedContent | null>;
  existsByContent(content: string): Promise<boolean>;
  findAll(): Promise<PostedContent[]>;
  delete(id: string): Promise<void>;
}
