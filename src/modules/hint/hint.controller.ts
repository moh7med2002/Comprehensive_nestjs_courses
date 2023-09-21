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
import { HintService } from './hint.service';
import { HintDto } from './dto';

@Controller('hint')
export class HintController {
  constructor(private hintService: HintService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() dto: HintDto) {
    return this.hintService.createHint(dto);
  }
}
