import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';
import { CourseService } from '../course/course.service';
import { HintDto } from './dto';

@Injectable()
export class HintService {
  constructor(
    @Inject(hintRepositry)
    private hintModel: typeof Hint,
    private courseService: CourseService,
  ) {}

  async createHint(dto: HintDto) {
    await this.courseService.courseById(dto.courseId);
    await this.hintModel.create({
      content: dto.content,
      courseId: dto.courseId,
    });
    return { message: 'Hint has been created' };
  }
}
