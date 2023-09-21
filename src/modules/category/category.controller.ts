import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { AuthGuard } from 'src/common/util/guards.stradegey';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put('update/:categoryId')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  update(@Body() dto: CategoryDto, @Param('categoryId') categoryId: string) {
    return this.categoryService.updateCategory(dto, categoryId);
  }

  @Get('all')
  getAll() {
    return this.categoryService.fetchAll();
  }
}
