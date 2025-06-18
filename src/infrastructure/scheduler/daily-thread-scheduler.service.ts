import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { ScheduleThreadsUseCase } from '../../application/use-cases/schedule-threads.use-case';

@Injectable()
export class DailyThreadSchedulerService {
  private readonly logger = new Logger(DailyThreadSchedulerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly scheduleThreadsUseCase: ScheduleThreadsUseCase,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scheduleDailyThreads() {
    try {
      const postingTimes = this.configService
        .get<string>('POSTING_TIMES', '09:00,14:00,19:00')
        .split(',')
        .map((t) => t.trim());
      const threadSize = parseInt(
        this.configService.get<string>('THREAD_SIZE', '7'),
        10,
      );

      this.logger.log(
        `Scheduling threads for times: ${postingTimes.join(', ')}`,
      );

      await this.scheduleThreadsUseCase.execute({
        postingTimes,
        threadSize,
      });

      this.logger.log('Successfully scheduled threads for the day.');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to schedule daily threads: ${errorMessage}`);
    }
  }
}
