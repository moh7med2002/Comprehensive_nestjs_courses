import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { quizRepositry } from 'src/constants/entityRepositry';
import { Quiz } from './quiz.entity';
import { CourseService } from '../course/course.service';
import { QuizDto } from './dto';
import { Course } from '../course/course.entity';
import { Question } from '../queston/question.entity';
import { Sequelize } from 'sequelize';
import { Answer } from '../answer/answer.entity';
import { StudentCourseService } from '../studentCourse/studentCourse.service';

@Injectable()
export class QuizService {
  constructor(
    @Inject(quizRepositry)
    private quizModel: typeof Quiz,
    private courseService: CourseService,
    private studentCorseService: StudentCourseService,
  ) {}

  async createQuiz(dto: QuizDto) {
    await this.courseService.courseById(dto.courseId);
    await this.quizModel.create({
      courseId: dto.courseId,
      title: dto.title,
      numberOfQuistion: dto.numberOfQuistion,
      duration: dto.duration,
    });
    return { message: 'quiz has been created' };
  }

  async getSingleQuiz(stId: number, quizId: string) {
    const foundQuiz = await this.quizById(quizId);
    const registerPromise = this.studentCorseService.isRegisterCourse(
      stId,
      foundQuiz.courseId,
    );
    const [] = await Promise.all([registerPromise]);
    const quiz = await this.quizModel.findByPk(quizId, {
      include: [
        {
          model: Course,
          attributes: ['id', 'title'],
        },
        {
          model: Question,
          limit: foundQuiz.numberOfQuistion,
          order: Sequelize.literal('rand()'),
          include: [
            {
              model: Answer,
              separate: true,
              order: Sequelize.literal('rand()'),
            },
          ],
        },
      ],
    });
    return { quiz };
  }

  async quizById(id) {
    const quiz = await this.quizModel.findByPk(id);
    if (!quiz) {
      throw new BadRequestException('invalid quiz id');
    }
    return quiz;
  }
}
