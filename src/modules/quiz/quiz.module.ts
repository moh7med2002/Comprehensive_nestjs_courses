import { Module } from '@nestjs/common';
import { quizRepositry } from 'src/constants/entityRepositry';
import { Quiz } from './quiz.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: quizRepositry,
      useValue: Quiz,
    },
  ],
})
export class QuizModule {}
