import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonDto } from './dto';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Put(':lessonId')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  getAllDays(@Body() dto: LessonDto, @Param('lessonId') lessonId: string) {
    return this.lessonService.updateLesson(dto, lessonId);
  }
}
