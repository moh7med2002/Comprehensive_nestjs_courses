import {
  IsNotEmpty,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class Answer {
  @IsNotEmpty({ message: 'Answer title cannot be empty.' })
  title: string;

  @IsNotEmpty({ message: 'isRight value cannot be empty.' })
  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  quizId: string | number;

  @IsNotEmpty()
  questionTitle: string;

  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @Type(() => Answer)
  @ValidateNested({ each: true })
  answers: Answer[];
}
