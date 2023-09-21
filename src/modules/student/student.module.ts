import { Module } from '@nestjs/common';
import { studentRepositry } from 'src/constants/entityRepositry';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [StudentController],
  providers: [
    {
      provide: studentRepositry,
      useValue: Student,
    },
    StudentService,
  ],
  exports: [StudentService],
})
export class StudentModule {}
