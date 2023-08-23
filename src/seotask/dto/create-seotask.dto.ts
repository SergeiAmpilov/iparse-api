import { IsString, IsUrl } from 'class-validator';


export class CreateSeoTaskDto {
  @IsString()
  parser: string;

  @IsUrl(undefined, { message: 'Incorrect resource url' })
  resource: string;
}