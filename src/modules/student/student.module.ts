import { Module } from '@nestjs/common';
import { studentRepositry } from 'src/constants/entityRepositry';
import { Student } from './student.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: studentRepositry,
      useValue: Student,
    },
  ],
})
export class StudentModule {}
