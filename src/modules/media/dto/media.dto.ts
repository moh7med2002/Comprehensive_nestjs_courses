import { IsNotEmpty } from 'class-validator';

export class MediaDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  courseId: string | number;
}
