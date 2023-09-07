import { Module } from '@nestjs/common';
import { dayRepositry } from 'src/constants/entityRepositry';
import { Day } from './day.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: dayRepositry,
      useValue: Day,
    },
  ],
})
export class DayModule {}
