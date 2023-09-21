import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { courseRepositry } from 'src/constants/entityRepositry';
import { Course } from './course.entity';
import { CourseDayDto, CourseDto } from './dto';
import { CategoryService } from '../category/category.service';
import { DayService } from '../day/day.service';
import { LessonService } from '../lesson/lesson.service';
import { Sequelize } from 'sequelize';
import { StudentService } from '../student/student.service';
import { StudentCourseService } from '../studentCourse/studentCourse.service';
import { Media } from '../media/media.entity';
import { Lesson } from '../lesson/lesson.entity';
import { Quiz } from '../quiz/quiz.entity';

@Injectable()
export class CourseService {
  constructor(
    @Inject(courseRepositry)
    private courseRepositry: typeof Course,
    private categorySrvice: CategoryService,
    private daySrvice: DayService,
    private lessonSrvice: LessonService,
    private studentService: StudentService,
    private studentCourseService: StudentCourseService,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}

  async createCourse(dto: CourseDto) {
    if (new Date(dto.startDate) >= new Date(dto.endDate)) {
      throw new BadRequestException('invalid start and end date');
    }
    await this.categorySrvice.categoryById(dto.categoryId);
    await this.courseRepositry.create({ ...dto });
    return { meessage: 'create course success' };
  }

  async createDayForCourse(dto: CourseDayDto, courseId: string) {
    // Start a transaction
    const transaction = await this.sequelize.transaction();
    try {
      const startTime = new Date(`1970-01-01T${dto.startHour}`);
      const endTime = new Date(`1970-01-01T${dto.endHour}`);
      if (startTime >= endTime) {
        throw new BadRequestException('Start hour must be before end hour');
      }
      const dayPromise = this.daySrvice.dayById(dto.dayId);
      const coursePromise = this.courseById(courseId);
      const [course, day] = await Promise.all([coursePromise, dayPromise]);
      const hasDay = await course.$has('day', day);
      if (hasDay) {
        throw new BadRequestException('already have this day');
      }
      // await course.$add('day', day, {
      //   through: { startHour: dto.startHour, endHour: dto.endHour },
      // });
      await course.$add('day', day, {
        through: { startHour: dto.startHour, endHour: dto.endHour },
        transaction, // Pass the transaction object here
      });
      await this.lessonSrvice.createLessons(
        course,
        day.title,
        dto.startHour,
        transaction,
      );
      await transaction.commit();
      return { message: 'lessons has been created' };
    } catch (error) {
      // Rollback the transaction if there's an error
      await transaction.rollback();
      throw error;
    }
  }

  async lessonsCourseForOneDay(courseId: string, dayId: string) {
    const dayPromise = this.daySrvice.dayById(dayId);
    const coursePromise = this.courseById(courseId);
    const [course, day] = await Promise.all([coursePromise, dayPromise]);
    const lessons = await this.lessonSrvice.getLessonsByDayOfWeek(
      day.title,
      course.id,
    );
    return { lessons };
  }

  async allCourses() {
    const courses = await this.courseRepositry.findAll();
    return { courses };
  }

  async registerCourse(stId: number, courseId: string) {
    const studentPromise = this.studentService.studentById(stId);
    const coursePromise = this.courseById(courseId);
    const [student, course] = await Promise.all([
      studentPromise,
      coursePromise,
    ]);
    const isStudentRegister = await course.$has('students', student);
    if (isStudentRegister) {
      throw new BadRequestException('Register course failed');
    }
    await course.$add('students', student);
    return { message: 'course register success' };
  }

  async getCourseDetail(stId: number, courseId: string) {
    const registerPromise = this.studentCourseService.isRegisterCourse(
      stId,
      courseId,
    );
    const studentPromise = this.studentService.studentById(stId);
    const coursePromise = this.courseById(courseId);
    const [] = await Promise.all([
      studentPromise,
      coursePromise,
      registerPromise,
    ]);
    const course = await this.courseRepositry.findByPk(courseId, {
      include: [
        {
          model: Media,
          attributes: ['id', 'path', 'title'],
        },
        {
          model: Lesson,
          attributes: ['id', 'title', 'link', 'date'],
        },
        {
          model: Quiz,
        },
      ],
    });
    return { course };
  }

  async courseById(id) {
    const category = await this.courseRepositry.findByPk(id);
    if (!category) {
      throw new BadRequestException('invalid course id');
    }
    return category;
  }
}
