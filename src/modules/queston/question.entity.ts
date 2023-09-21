import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Quiz } from '../quiz/quiz.entity';
import { Answer } from '../answer/answer.entity';

@Table
export class Question extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  title: string;

  @ForeignKey(() => Quiz)
  @Column
  quizId: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;

  @HasMany(() => Answer)
  answers: Answer[];
}
