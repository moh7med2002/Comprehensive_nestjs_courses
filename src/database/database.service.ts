import { days } from 'src/constants/days';
import { Admin } from 'src/modules/admin/admin.entity';
import { Category } from 'src/modules/category/category.entity';
import { Course } from 'src/modules/course/course.entity';
import { CourseDay } from 'src/modules/courseDay/courseDay.entity';
import { Day } from 'src/modules/day/day.entity';
import { Hint } from 'src/modules/hint/hint.entity';
import { Lesson } from 'src/modules/lesson/lesson.entity';
import { Media } from 'src/modules/media/media.entity';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { Student } from 'src/modules/student/student.entity';
import { StudentCourse } from 'src/modules/studentCourse/studentCourseentity';
import { sequelize } from './connection';
import { Question } from 'src/modules/queston/question.entity';
import { Answer } from 'src/modules/answer/answer.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.addModels([
        Admin,
        Student,
        Category,
        Course,
        Day,
        CourseDay,
        Lesson,
        Media,
        Hint,
        StudentCourse,
        Quiz,
        Question,
        Answer,
      ]);
      await sequelize.sync({ alter: false });
      const existingDaysCount = await Day.count();
      if (existingDaysCount === 0) {
        await Day.bulkCreate(days);
      }
      return sequelize;
    },
  },
];
