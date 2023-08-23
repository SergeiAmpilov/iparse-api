import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FinishSeoTaskDto {
  @IsNumber()
  count: number;

  @IsString()
  @IsOptional()
  file?: string;
}