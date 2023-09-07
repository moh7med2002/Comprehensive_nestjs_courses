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
export class Media extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  path: string;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;
}
