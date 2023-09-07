import { Module } from '@nestjs/common';
import { courseDayRepositry } from 'src/constants/entityRepositry';
import { CourseDay } from './courseDay.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: courseDayRepositry,
      useValue: CourseDay,
    },
  ],
})
export class CourseDayModule {}
