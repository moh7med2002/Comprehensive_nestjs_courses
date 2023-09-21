import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class LessonDto {
  @Length(3)
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;
}
