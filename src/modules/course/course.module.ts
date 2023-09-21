import { Module } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CategoryModule } from '../category/category.module';
import { DayModule } from '../day/day.module';
import { LessonModule } from '../lesson/lesson.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { StudentModule } from '../student/student.module';
import { StudentCourseModule } from '../studentCourse/studentCourse.module';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: courseRepositry,
      useValue: Course,
    },
    CourseService,
  ],
  imports: [
    CategoryModule,
    DayModule,
    LessonModule,
    DatabaseModule,
    StudentModule,
    StudentCourseModule,
  ],
  exports: [CourseService],
})
export class CourseModule {}
