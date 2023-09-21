import { Module } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';
import { QuizModule } from '../quiz/quiz.module';
import { QuestionService } from './quistion.service';
import { DatabaseModule } from 'src/database/database.module';
import { AnswerModule } from '../answer/answer.module';
import { QuestionController } from './question.controller';

@Module({
  controllers: [QuestionController],
  providers: [
    {
      provide: questionRepositry,
      useValue: Question,
    },
    QuestionService,
  ],
  imports: [QuizModule, DatabaseModule, AnswerModule],
})
export class QuestionModule {}
