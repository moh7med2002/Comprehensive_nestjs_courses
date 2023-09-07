import {
  Column,
  Table,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { CourseDay } from '../courseDay/courseDay.entity';

@Table
export class Day extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @BelongsToMany(() => Course, () => CourseDay)
  courses: Course[];
}
