import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Course } from '../course/course.entity';

@Table
export class Category extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @HasMany(() => Course)
  courses: Course[];
}
