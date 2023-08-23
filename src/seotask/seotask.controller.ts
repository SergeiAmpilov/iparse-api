import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeoTaskDto } from './dto/create-seotask.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { FinishSeoTaskDto } from './dto/finish-seotask.dto';
import { SeotaskService } from './seotask.service';

@Controller('seotask')
export class SeotaskController {
  constructor( 
    private readonly seoTaskService: SeotaskService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTask(
    @Param('id') id: string, 
    @UserEmail() userEmail: string
    ) {
      return this.seoTaskService.getVerifiedTask(id, userEmail);
    }


  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async runTask(
    @Body() dto: CreateSeoTaskDto,
    @UserEmail() userEmail: string
  ) {
    return this.seoTaskService.createAndRunNewTask(dto, userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('byparser/:parserid')
  async getAllTasksByParser(
    @Param('parserid') parserid: string, 
    @UserEmail() userEmail: string
  ) {
    return this.seoTaskService.getTaskListByParser(parserid, userEmail);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('finish/:id')
  async finishTask(
    @Body() dto: FinishSeoTaskDto,
    @Param('id') id: string, 
    @UserEmail() userEmail: string
  ) {
    return this.seoTaskService.finishTask(dto, id, userEmail);
  }
}
