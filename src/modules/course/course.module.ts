import { Module } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: courseRepositry,
      useValue: Course,
    },
  ],
})
export class CourseModule {}
