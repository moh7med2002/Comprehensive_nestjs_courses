import { Controller, Get, Res, Param, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { createCall } from './common/util/createCall';

type Dto = {
  from: string;
  to: string;
};

@Controller('uploads')
export class AppController {
  @Get(':filename')
  getFile(@Res() res: Response, @Param('filename') fileName: string) {
    res.sendFile(path.join(__dirname, '../uploads/' + fileName));
  }

  @Post('call')
  call(@Body() dto: Dto) {
    return createCall(dto.from, dto.to);
  }
}
