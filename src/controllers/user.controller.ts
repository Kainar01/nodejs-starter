import { Body, JsonController, Post, Res } from "routing-controllers";
import { singleton } from "tsyringe";
import { UserService } from "../services";
import { Response } from "express";
import { LoginDto, UserCreateDto } from "../dto";

@singleton()
@JsonController("/users")
export class UserController {
  public constructor(private userService: UserService) {}

  @Post("/login")
  public login(@Res() res: Response, @Body() data: LoginDto) {
    return this.userService.login(data, res);
  }

  @Post("/register")
  public register(@Res() res: Response, @Body() data: UserCreateDto) {
    return this.userService.register(data, res);
  }
}
