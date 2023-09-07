import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './common/util/custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './geteway/geteway.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';
import { DayModule } from './modules/day/day.module';
import { CourseDay } from './modules/courseDay/courseDay.entity';
import { LessonModule } from './modules/lesson/lesson.module';
import { MediaModule } from './modules/media/media.module';
import { HintModule } from './modules/hint/hint.module';
import { StudentCourseModule } from './modules/studentCourse/studentCourse.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    DatabaseModule,
    GatewayModule,
    AdminModule,
    StudentModule,
    CategoryModule,
    CourseModule,
    DayModule,
    CourseDay,
    LessonModule,
    MediaModule,
    HintModule,
    StudentCourseModule,
    QuizModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
