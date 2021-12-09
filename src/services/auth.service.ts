import { singleton } from "tsyringe";
import { AuthConfig, ConfigWrapper } from "../config/constraint";
import jwt from "jsonwebtoken";
import { Connection } from "typeorm";
import _ from "lodash";
import { Response } from "express";
import { assert } from "../utils";
import bcrypt from "bcrypt";
import { TokenPayload, JwtToken, LoginDtoType } from "../types";
import { UserEntity, UserRepository } from "../models/user.model";

@singleton()
export class AuthService {
  private authConfig: AuthConfig;
  private userRepository: UserRepository;

  constructor({ config }: ConfigWrapper, connection: Connection) {
    this.authConfig = config.getTyped("auth");
    this.userRepository = connection.getRepository(UserEntity);
  }

  public getToken = (payload: TokenPayload): JwtToken => {
    const access = jwt.sign(payload, this.authConfig.jwtSecret, {
      algorithm: "HS256",
      expiresIn: this.authConfig.jwtTokenLife,
    });

    //create the refresh token with the longer lifespan
    const refresh = jwt.sign(payload, this.authConfig.jwtSecret, {
      algorithm: "HS256",
      expiresIn: this.authConfig.jwtRefreshTokenLife,
    });

    return { access, refresh };
  };

  public async setAuthCookie(res: Response, { access, refresh }: JwtToken) {
    res.cookie("access", access, {
      secure: this.authConfig.cookieSecure,
      httpOnly: true,
      sameSite: "none",
    });
    res.cookie("refresh", refresh, {
      secure: this.authConfig.cookieSecure,
      httpOnly: true,
      sameSite: "none",
    });
  }

  public authorizeUser = async ({ email, password }: LoginDtoType) => {
    const user = await this.userRepository.findOne(
      { email },
      { select: ["id", "password"] }
    );

    assert(user, 404, "User not found");

    assert(
      await bcrypt.compare(password, user.password),
      401,
      "Credentials wrong"
    );

    return user;
  };
}
