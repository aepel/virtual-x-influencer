import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateThreadUseCase } from '../application/use-cases/create-thread.use-case';
import { PublishThreadUseCase } from '../application/use-cases/publish-thread.use-case';
import { ScheduleThreadsUseCase } from '../application/use-cases/schedule-threads.use-case';

@Controller('threads')
export class ThreadController {
  constructor(
    private readonly createThreadUseCase: CreateThreadUseCase,
    private readonly publishThreadUseCase: PublishThreadUseCase,
    private readonly scheduleThreadsUseCase: ScheduleThreadsUseCase,
  ) {}

  @Post()
  async createThread(@Body() body: { topicId: string; threadSize?: number }) {
    try {
      return await this.createThreadUseCase.execute(body);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/publish')
  async publishThread(@Param('id') threadId: string) {
    try {
      return await this.publishThreadUseCase.execute({ threadId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('schedule')
  async scheduleThreads(
    @Body() body: { postingTimes: string[]; threadSize?: number },
  ) {
    try {
      return await this.scheduleThreadsUseCase.execute(body);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
