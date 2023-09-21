import { Module } from '@nestjs/common';
import { lessonRepositry } from 'src/constants/entityRepositry';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';

@Module({
  controllers: [LessonController],
  providers: [
    {
      provide: lessonRepositry,
      useValue: Lesson,
    },
    LessonService,
  ],
  exports: [LessonService],
})
export class LessonModule {}
