import { Module } from '@nestjs/common';
import { dayRepositry } from 'src/constants/entityRepositry';
import { Day } from './day.entity';
import { DayController } from './day.controller';
import { DayService } from './day.service';

@Module({
  controllers: [DayController],
  providers: [
    {
      provide: dayRepositry,
      useValue: Day,
    },
    DayService,
  ],
  exports: [DayService],
})
export class DayModule {}
