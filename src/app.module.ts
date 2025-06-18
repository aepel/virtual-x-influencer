import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

// Controllers
import { ThreadController } from './controllers/thread.controller';

// Use Cases
import { CreateThreadUseCase } from './application/use-cases/create-thread.use-case';
import { PublishThreadUseCase } from './application/use-cases/publish-thread.use-case';
import { ScheduleThreadsUseCase } from './application/use-cases/schedule-threads.use-case';

// Repositories
import { TopicRepositoryImpl } from './infrastructure/repositories/topic.repository.impl';

// Services
import { PrismaService } from './infrastructure/database/prisma.service';
import { GrokContentGenerationServiceImpl } from './infrastructure/services/grok-content-generation.service.impl';
import { TwitterPublishingServiceImpl } from './infrastructure/services/twitter-publishing.service.impl';

// Scheduler
import { ThreadSchedulerService } from './infrastructure/scheduler/thread-scheduler.service';
import { DailyThreadSchedulerService } from './infrastructure/scheduler/daily-thread-scheduler.service';

// Provider tokens
export const TOPIC_REPOSITORY = 'TOPIC_REPOSITORY';
export const GROK_SERVICE = 'GROK_SERVICE';
export const TWITTER_SERVICE = 'TWITTER_SERVICE';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [ThreadController],
  providers: [
    // Use Cases
    CreateThreadUseCase,
    PublishThreadUseCase,
    ScheduleThreadsUseCase,

    // Database
    PrismaService,

    // Repositories
    {
      provide: TOPIC_REPOSITORY,
      useClass: TopicRepositoryImpl,
    },

    // Services
    {
      provide: GROK_SERVICE,
      useClass: GrokContentGenerationServiceImpl,
    },
    {
      provide: TWITTER_SERVICE,
      useClass: TwitterPublishingServiceImpl,
    },

    // Scheduler
    ThreadSchedulerService,
    DailyThreadSchedulerService,
  ],
})
export class AppModule {}
