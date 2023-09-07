import {
  Column,
  Table,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { StudentCourse } from '../studentCourse/studentCourseentity';

@Table
export class Student extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    unique: true,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  country: string;

  @BelongsToMany(() => Course, () => StudentCourse)
  courses: Course[];
}
