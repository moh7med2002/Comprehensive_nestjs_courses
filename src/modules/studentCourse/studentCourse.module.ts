import { Module } from '@nestjs/common';
import { studentCourseRepositry } from 'src/constants/entityRepositry';
import { StudentCourse } from './studentCourseentity';

@Module({
  controllers: [],
  providers: [
    {
      provide: studentCourseRepositry,
      useValue: StudentCourse,
    },
  ],
})
export class StudentCourseModule {}
