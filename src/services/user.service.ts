import { singleton } from "tsyringe";
import { Connection } from "typeorm";
import { Response } from "express";
import { LoginDtoType, RegisterDtoType, TokenPayload } from "../types";
import { AuthService } from ".";
import { UserEntity, UserRepository } from "../models/user.model";

@singleton()
export class UserService {
  private userRepository: UserRepository;
  constructor(connection: Connection, private authService: AuthService) {
    this.userRepository = connection.getRepository(UserEntity);
  }

  public async login(params: LoginDtoType, res: Response) {
    const user = await this.authService.authorizeUser(params);

    const tokenPayload: TokenPayload = {
      id: user.id,
    };

    const jwt = this.authService.getToken(tokenPayload);

    this.authService.setAuthCookie(res, jwt); // set cookie

    return jwt;
  }

  public async register(dto: RegisterDtoType, res: Response) {
    const user = this.userRepository.create(dto);

    await this.userRepository.save(user);

    const tokenPayload: TokenPayload = {
      id: user.id,
    };

    const jwt = this.authService.getToken(tokenPayload);

    this.authService.setAuthCookie(res, jwt); // set cookie

    return jwt;
  }
}
