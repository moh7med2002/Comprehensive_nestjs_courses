import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { StudentSignupDto, StudentLoginDto } from './dto';
import { StudentService } from './student.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/util/custom.storage';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  adminSignup(
    @Body() dto: StudentSignupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('upload image is required');
    }
    return this.studentService.register(dto, file);
  }

  @Post('/login')
  adminLogin(@Body() dto: StudentLoginDto) {
    return this.studentService.login(dto);
  }
}
