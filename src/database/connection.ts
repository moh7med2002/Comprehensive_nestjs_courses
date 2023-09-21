import { Sequelize } from 'sequelize-typescript';
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '059283805928388',
  database: 'education_nest',
});
