import { IsNotEmpty } from 'class-validator';

export class HintDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  courseId: string | number;
}
