import { IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class UpdateSeoParserDto {
  @IsUrl(undefined, { message: 'Incorrect resource url' })
  @IsOptional()
  resource?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
