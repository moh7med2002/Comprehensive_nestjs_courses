import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { Day } from '../day/day.entity';
import { CourseDay } from '../courseDay/courseDay.entity';
import { Lesson } from '../lesson/lesson.entity';
import { Media } from '../media/media.entity';
import { Student } from '../student/student.entity';
import { StudentCourse } from '../studentCourse/studentCourseentity';
import { Quiz } from '../quiz/quiz.entity';

@Table
export class Course extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  maxStudents: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  startDate: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  endDate: Date;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  description: string;

  @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 1 })
  price: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => Day, () => CourseDay)
  days: Day[];

  @BelongsToMany(() => Student, () => StudentCourse)
  students: Student[];

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @HasMany(() => Media)
  medias: Media[];

  @HasMany(() => Quiz)
  quizzes: Quiz[];
}
