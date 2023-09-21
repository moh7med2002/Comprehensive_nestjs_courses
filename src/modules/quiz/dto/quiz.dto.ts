import { IsNotEmpty, Length, Min } from 'class-validator';

export class QuizDto {
  @Length(3)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  courseId: string | number;

  @Min(5, { message: "Quiz time can't be less than five minute" })
  @IsNotEmpty()
  duration: number;

  @Min(5, { message: "Quiz quistion can't be less than five" })
  @IsNotEmpty()
  numberOfQuistion: number;
}
