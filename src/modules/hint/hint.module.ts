import { Module } from '@nestjs/common';
import { hintRepositry } from 'src/constants/entityRepositry';
import { Hint } from './hint.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: hintRepositry,
      useValue: Hint,
    },
  ],
})
export class HintModule {}
