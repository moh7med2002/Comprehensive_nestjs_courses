import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { lessonRepositry } from 'src/constants/entityRepositry';
import { Lesson } from './lesson.entity';
import { Course } from '../course/course.entity';
import { days } from 'src/constants/days';
import { Op, Sequelize, Transaction } from 'sequelize';
import { LessonDto } from './dto';

@Injectable()
export class LessonService {
  constructor(
    @Inject(lessonRepositry)
    private lessonRepositry: typeof Lesson,
  ) {}

  async createLessons(
    course: Course,
    day: string,
    hour: string,
    transaction: Transaction,
  ) {
    const lessons = [];
    const dayOfWeek = days.findIndex((d) => d.title === day);
    const courseStartDate = new Date(course.startDate);
    const courseEndDate = new Date(course.endDate);
    const currentDate = new Date(courseStartDate);

    const [hourPart, minutePart] = hour.split(':');
    const hourNumber = parseInt(hourPart, 10);
    const minuteNumber = parseInt(minutePart, 10);

    currentDate.setDate(
      courseStartDate.getDate() + ((dayOfWeek - currentDate.getDay() + 7) % 7),
    );
    // Create lessons for the specified day of the week within the course date range
    while (currentDate <= courseEndDate) {
      currentDate.setUTCHours(hourNumber, minuteNumber);
      await this.lessonRepositry.create(
        {
          date: currentDate,
          courseId: course.id,
        },
        { transaction },
      );
      // Increment the current date by 7 days (1 week)
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return lessons;
  }

  async getLessonsByDayOfWeek(day: string, courseId) {
    const dayOfWeek = days.findIndex((d) => d.title === day);
    console.log(dayOfWeek);
    const lessons = await this.lessonRepositry.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('DAYOFWEEK', Sequelize.col('date')),
            dayOfWeek + 1, // Add 1 because DAYOFWEEK returns values in the range 1-7
          ),
          { courseId: courseId }, // Add courseId as a condition
        ],
      },
    });
    return lessons;
  }

  async updateLesson(dto: LessonDto, lessonId: string) {
    await this.lessonRepositry.update(
      { title: dto.title, link: dto.link },
      { where: { id: lessonId } },
    );
    return { message: 'lesson has been updated' };
  }
}
