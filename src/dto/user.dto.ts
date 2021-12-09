import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { LoginDtoType, UserCreateDtoType, UserUpdateDtoType } from "../types";

export class LoginDto implements LoginDtoType {
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  public password!: string;
}

export class UserCreateDto extends LoginDto implements UserCreateDtoType {
  @IsString()
  @IsOptional()
  public firstName!: string | null | undefined;

  @IsString()
  @IsOptional()
  public lastName!: string | null | undefined;
}

export class UserUpdateDTO implements UserUpdateDtoType {
  @IsString()
  @IsOptional()
  public email!: string | undefined;

  @IsString()
  @IsOptional()
  public password!: string | undefined;

  @IsString()
  @IsOptional()
  public firstName!: string | null | undefined;

  @IsString()
  @IsOptional()
  public lastName!: string | null | undefined;
}
