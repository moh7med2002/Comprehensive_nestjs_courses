import { IsNotEmpty, Matches, Min } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Min(1)
  maxStudents: number;

  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsNotEmpty()
  categoryId: number | string;

  @Matches(/^\d{4}-\d{1,2}-\d{1,2}$/, { message: 'not valid date' })
  @IsNotEmpty()
  startDate: Date;

  @Matches(/^\d{4}-\d{1,2}-\d{1,2}$/, { message: 'not valid date' })
  @IsNotEmpty()
  endDate: string;
}

export class CourseDayDto {
  @IsNotEmpty()
  dayId: number | string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Not a valid time format (hh:mm)',
  })
  @IsNotEmpty()
  startHour: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Not a valid time format (hh:mm)',
  })
  @IsNotEmpty()
  endHour: string;
}
