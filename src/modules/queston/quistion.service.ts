import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { questionRepositry } from 'src/constants/entityRepositry';
import { Question } from './question.entity';
import { QuizService } from '../quiz/quiz.service';
import { CreateQuestionDto } from './dto';
import { Sequelize } from 'sequelize';
import { AnswerService } from '../answer/answer.service';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(questionRepositry)
    private questionModel: typeof Question,
    private quizService: QuizService,
    private answerService: AnswerService,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    await this.quizService.quizById(dto.quizId);
    const transaction = await this.sequelize.transaction();
    const countCorrectAnswers = dto.answers.filter(
      (an) => an.isCorrect === true,
    );
    if (countCorrectAnswers.length !== 1) {
      throw new BadRequestException('Only one answer can be true');
    }
    try {
      const createdQuestion = await this.questionModel.create(
        {
          title: dto.questionTitle,
          quizId: dto.quizId,
        },
        { transaction },
      );
      const answers = dto.answers.map((an) => {
        return { ...an, questionId: createdQuestion.id };
      });
      await this.answerService.createAnswers(answers, transaction);
      await transaction.commit();
      return { message: 'question has been created' };
    } catch (error) {
      // Rollback the transaction if there's an error
      console.log('ss');
      await transaction.rollback();
      throw error;
    }
  }
}
