import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';

@Table
export class Hint extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  content: string;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;
}
