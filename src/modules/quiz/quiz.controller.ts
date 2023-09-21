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
import { QuizService } from './quiz.service';
import { QuizDto } from './dto';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() dto: QuizDto) {
    return this.quizService.createQuiz(dto);
  }

  @Get(':quizId')
  @UseGuards(AuthGuard)
  @Roles(Role.Student)
  getQuiz(@Param('quizId') quizId: string, @SaveUser() user: tokenPayload) {
    return this.quizService.getSingleQuiz(user.userId, quizId);
  }
}
