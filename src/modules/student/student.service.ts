import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Student } from './student.entity';
import { StudentLoginDto, StudentSignupDto } from './dto';
import { Role } from 'src/common/types/role.enum';
import { hashPassword, VerifyPassword } from 'src/common/util/passwordUtil';
import { generateToken } from 'src/common/util/generateToken';
import { studentRepositry } from 'src/constants/entityRepositry';

@Injectable()
export class StudentService {
  constructor(
    @Inject(studentRepositry)
    private studentModel: typeof Student,
  ) {}

  async register(
    dto: StudentSignupDto,
    file: Express.Multer.File,
  ): Promise<{ msg: string }> {
    const { password, email, name, country } = dto;
    const student = await this.studentModel.findOne({ where: { email } });
    if (student) {
      throw new BadRequestException('email is found');
    }
    const hasPassword = await hashPassword(password);
    await this.studentModel.create({
      image: file.filename,
      password: hasPassword,
      email,
      name,
      country,
    });
    return { msg: "'your account has been created'" };
  }

  async login(
    dto: StudentLoginDto,
  ): Promise<{ msg: string; student: Student; token: string }> {
    const { email } = dto;
    const student = await this.studentModel
      .scope('withoutTimeStamps')
      .findOne({ where: { email } });
    if (!student) {
      throw new ForbiddenException('Invalid Email');
    }
    const isMatch = await VerifyPassword(dto.password, student.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid Password');
    }
    const payload = { userId: student.id, role: Role.Student };
    const access_token = generateToken(payload);
    const { password, ...other } = student.toJSON();
    return {
      msg: 'success login',
      student: other,
      token: access_token,
    };
  }

  async studentById(id: any) {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new BadRequestException('invalid student id');
    }
    return student;
  }
}
