import { IsEnum, IsString } from 'class-validator';
import { MarkdownVisibility } from '@serializedowen/enums';

export class MarkdownDTO {
  @IsString()
  content: string;

  @IsEnum({
    [MarkdownVisibility.PRIVATE]: MarkdownVisibility.PRIVATE,
    [MarkdownVisibility.PUBLIC]: MarkdownVisibility.PUBLIC,
  })
  visibility: MarkdownVisibility;
}
