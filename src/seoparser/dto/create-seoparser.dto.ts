import { IsUrl } from 'class-validator';

export class CreateSeoParserDto {
  @IsUrl(undefined, { message: 'Incorrect resource url' })
  resource: string;
}
