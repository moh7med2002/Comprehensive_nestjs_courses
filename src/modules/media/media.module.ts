import { Module } from '@nestjs/common';
import { mediaRepositry } from 'src/constants/entityRepositry';
import { Media } from './media.entity';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [MediaController],
  providers: [
    {
      provide: mediaRepositry,
      useValue: Media,
    },
    MediaService,
  ],
  imports: [CourseModule],
})
export class MediaModule {}
