import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeoTaskDto } from './dto/create-seotask.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { FinishSeoTaskDto } from './dto/finish-seotask.dto';

@Controller('seotask')
export class SeotaskController {

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTask(
    @Param('id') id: string, 
    @UserEmail() userEmail: string
    ) {}


  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async runTask(
    @Body() dto: CreateSeoTaskDto,
    @UserEmail() userEmail: string
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('byparser/:parserid')
  async getAllTasksByParser(
    @Param('parserid') parserid: string, 
    @UserEmail() userEmail: string
  ) {}

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('finish/:id')
  async finishTask(
    @Body() dto: FinishSeoTaskDto,
    @UserEmail() userEmail: string
  ) {}
}
