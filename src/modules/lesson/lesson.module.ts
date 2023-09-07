import { Module } from '@nestjs/common';
import { lessonRepositry } from 'src/constants/entityRepositry';
import { Lesson } from './lesson.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: lessonRepositry,
      useValue: Lesson,
    },
  ],
})
export class LessonModule {}
