import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StudentCourse } from './studentCourseentity';
import { studentCourseRepositry } from 'src/constants/entityRepositry';

@Injectable()
export class StudentCourseService {
  constructor(
    @Inject(studentCourseRepositry)
    private studentCourseModel: typeof StudentCourse,
  ) {}

  async isRegisterCourse(studentId, courseId) {
    const isFound = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });
    if (!isFound) {
      throw new BadRequestException('You are not register this course');
    }
    return isFound;
  }
}
