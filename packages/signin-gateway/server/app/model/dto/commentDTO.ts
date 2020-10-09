import { IsEmail, IsString } from "class-validator";

export class commentDTO {
  @IsString()
  content: string;
}
