import { ConfigWrapper } from "../config/constraint";
import { RequestHandler, Response } from "express";
import { Action } from "routing-controllers";
import { DependencyContainer } from "tsyringe";
import * as jwt from "jsonwebtoken";
import { assert } from "../utils";
import { TokenPayload } from "../types/auth";

export const makeAuthCheckers = (container: DependencyContainer) => {
  const { disabled } = container.resolve(ConfigWrapper).config.getTyped("auth");
  return {
    currentUserChecker: (action: Action) => {
      const response = action.response as Response;
      return response.locals?.user;
    },
    authorizationChecker: disabled
      ? () => {
          // Logger.warn("[Authorization] no authorization enabled");
          return true;
        }
      : async (action: Action) => {
          const response = action.response as Response;

          const user = response.locals?.user as TokenPayload | undefined;

          assert(user, 401, "User is required, but wasn't provided");

          return true;
        },
  };
};

export const makeAuthMiddleware = (
  container: DependencyContainer
): RequestHandler => {
  const { config } = container.resolve(ConfigWrapper);

  const secret = config.getTyped("auth").jwtSecret;

  return async (request, response, next) => {
    const cookies = request.cookies;
    const { authorization } = request.headers;
    const accessToken =
      authorization || (cookies?.access as string | undefined);

    if (accessToken) {
      try {
        const verificationResponse = jwt.verify(
          accessToken,
          secret
        ) as TokenPayload;

        response.locals.user = verificationResponse;
        next();
      } catch (error) {
        next();
      }
    } else {
      next();
    }
  };
};
