import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { Student } from '../student/student.entity';

@Table
export class StudentCourse extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => Student)
  @Column
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;
}
