import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';
import { MediaDto } from './dto';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file', { storage: CustomStorage.storage }))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: MediaDto) {
    if (!file) {
      throw new BadRequestException('upload image is required');
    }
    return this.mediaService.createMedia(dto, file.filename);
  }
}
