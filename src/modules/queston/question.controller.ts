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
import { QuestionService } from './quistion.service';
import { CreateQuestionDto } from './dto';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }
}
