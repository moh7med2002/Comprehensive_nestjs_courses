import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { answerRepositry } from 'src/constants/entityRepositry';
import { QuizService } from '../quiz/quiz.service';
import { Answer } from './answer.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(answerRepositry)
    private answerModel: typeof Answer,
  ) {}

  async createAnswers(answers: any[], transaction: Transaction) {
    await this.answerModel.bulkCreate(answers, { transaction });
  }
}
