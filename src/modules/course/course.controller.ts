import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { CourseService } from './course.service';
import { CourseDayDto, CourseDto } from './dto';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() dto: CourseDto) {
    return this.courseService.createCourse(dto);
  }

  @Post('day/create/:courseId')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  createDayForCourse(
    @Body() dto: CourseDayDto,
    @Param('courseId') courseId: string,
  ) {
    return this.courseService.createDayForCourse(dto, courseId);
  }

  @Get('lessons/:courseId/:dayId')
  getLessonsByDayOfWeek(
    @Param('courseId') courseId: string,
    @Param('dayId') dayId: string,
  ) {
    return this.courseService.lessonsCourseForOneDay(courseId, dayId);
  }

  @Get('all')
  allCoursesFetch() {
    return this.courseService.allCourses();
  }

  @Post('register/:courseId')
  @UseGuards(AuthGuard)
  @Roles(Role.Student)
  regsiterCourse(
    @SaveUser() user: tokenPayload,
    @Param('courseId') courseId: string,
  ) {
    return this.courseService.registerCourse(user.userId, courseId);
  }

  @Get(':courseId')
  @UseGuards(AuthGuard)
  @Roles(Role.Student)
  getCourseDetails(
    @SaveUser() user: tokenPayload,
    @Param('courseId') courseId: string,
  ) {
    return this.courseService.getCourseDetail(user.userId, courseId);
  }
}
