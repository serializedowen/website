import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

export class UserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  name: string;

  // @IsString()
  // password: string;

  // @IsPhoneNumber("CN")
  @IsString()
  phone: string;

  @IsNumber()
  age: number;
}
