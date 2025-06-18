import { Injectable } from '@nestjs/common';
import { Topic } from '../../domain/entities/topic.entity';
import { ITopicRepository } from '../../domain/repositories/topic.repository.interface';
import { PrismaService } from '../database/prisma.service';

interface PrismaTopic {
  id: string;
  name: string;
  category: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TopicRepositoryImpl implements ITopicRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(topic: Topic): Promise<Topic> {
    const data = {
      id: topic.id,
      name: topic.name,
      category: topic.category,
      description: topic.description,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
    };

    const savedTopic = await this.prisma.topic.upsert({
      where: { id: topic.id },
      update: data,
      create: data,
    });

    return this.mapToDomain(savedTopic);
  }

  async findById(id: string): Promise<Topic | null> {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
    });

    return topic ? this.mapToDomain(topic) : null;
  }

  async findByName(name: string): Promise<Topic | null> {
    const topic = await this.prisma.topic.findUnique({
      where: { name },
    });

    return topic ? this.mapToDomain(topic) : null;
  }

  async findByCategory(category: 'history' | 'geography'): Promise<Topic[]> {
    const topics = await this.prisma.topic.findMany({
      where: { category },
    });

    return topics.map((topic) => this.mapToDomain(topic));
  }

  async findAll(): Promise<Topic[]> {
    const topics = await this.prisma.topic.findMany();
    return topics.map((topic) => this.mapToDomain(topic));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.topic.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaTopic: PrismaTopic): Topic {
    return new Topic(
      prismaTopic.id,
      prismaTopic.name,
      prismaTopic.category as 'history' | 'geography',
      prismaTopic.description || undefined,
      prismaTopic.createdAt,
      prismaTopic.updatedAt,
    );
  }
}
