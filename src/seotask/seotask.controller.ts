import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeoTaskDto } from './dto/create-seotask.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('seotask')
export class SeotaskController {

  @Get(':id')
  async getTask() {}


  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async runTask(
    @Body() dto: CreateSeoTaskDto,
    @UserEmail() userEmail: string
  ) {}


  @Get()
  async getAllTasksByParser() {}

  @Post()
  async finishTask() {}
}
