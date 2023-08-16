import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSeoParserDto } from './dto/create-seoparser.dto';
import { SeoparserService } from './seoparser.service';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('seoparser')
export class SeoparserController {
  constructor(private readonly seoParserService: SeoparserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() dto: CreateSeoParserDto,
    @UserEmail() userEmail: string,
  ) {
    return this.seoParserService.create(dto, userEmail, true);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getList(@UserEmail() userEmail: string) {
    return this.seoParserService.getByOwner(userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCard(@Param('id') id: string, @UserEmail() userEmail: string) {
    return this.seoParserService.findById(id, userEmail);
  }
}
