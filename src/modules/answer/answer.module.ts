import { Module } from '@nestjs/common';
import { answerRepositry } from 'src/constants/entityRepositry';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: answerRepositry,
      useValue: Answer,
    },
    AnswerService,
  ],
  exports: [AnswerService],
})
export class AnswerModule {}
