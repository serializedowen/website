import { IsEmail, IsString } from "class-validator";

export class UserDTO {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
