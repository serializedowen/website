import { IsString } from 'class-validator';

export class MarkdownDTO {
  @IsString()
  content: string;
}
