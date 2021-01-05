import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @Length(6, 30)
  name: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsEmail()
  email: string;
}
