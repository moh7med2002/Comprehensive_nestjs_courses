import { Injectable, Inject } from '@nestjs/common';
import {
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { dayRepositry } from 'src/constants/entityRepositry';
import { Day } from './day.entity';

@Injectable()
export class DayService {
  constructor(
    @Inject(dayRepositry)
    private dayRepository: typeof Day,
  ) {}

  async fetchAllDays() {
    const days = await this.dayRepository.findAll();
    return { days };
  }

  async dayById(id) {
    const category = await this.dayRepository.findByPk(id);
    if (!category) {
      throw new BadRequestException('invalid day id');
    }
    return category;
  }
}
