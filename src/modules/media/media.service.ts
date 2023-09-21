import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { mediaRepositry } from 'src/constants/entityRepositry';
import { CourseService } from '../course/course.service';
import { Media } from './media.entity';
import { MediaDto } from './dto';

@Injectable()
export class MediaService {
  constructor(
    @Inject(mediaRepositry)
    private mediaModel: typeof Media,
    private courseService: CourseService,
  ) {}

  async createMedia(dto: MediaDto, image: string) {
    await this.courseService.courseById(dto.courseId);
    await this.mediaModel.create({
      title: dto.title,
      courseId: dto.courseId,
      path: image,
    });
    return { message: 'Course Media has been created' };
  }
}
