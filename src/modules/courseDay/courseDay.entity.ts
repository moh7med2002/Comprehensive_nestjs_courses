import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { Day } from '../day/day.entity';

@Table
export class CourseDay extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  startHour: string;

  @Column({ type: DataType.STRING, allowNull: false })
  endHour: string;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => Day)
  @Column
  dayId: number;

  @BelongsTo(() => Day)
  day: Day;
}
