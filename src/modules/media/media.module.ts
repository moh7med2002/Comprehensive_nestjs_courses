import { Module } from '@nestjs/common';
import { mediaRepositry } from 'src/constants/entityRepositry';
import { Media } from './media.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: mediaRepositry,
      useValue: Media,
    },
  ],
})
export class MediaModule {}
