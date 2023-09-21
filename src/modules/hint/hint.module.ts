import { Module } from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';
import { CourseModule } from '../course/course.module';
import { HintService } from './hint.service';
import { HintController } from './hint.controller';

@Module({
  controllers: [HintController],
  providers: [
    {
      provide: hintRepositry,
      useValue: Hint,
    },
    HintService,
  ],
  imports: [CourseModule],
})
export class HintModule {}
