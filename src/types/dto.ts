import { PickNullable, User, PickPartial, RunRecord } from ".";

export type UserCreateDtoType = PickNullable<
  Omit<User, "id">,
  "firstName" | "lastName"
>;
export type UserUpdateDtoType = Partial<UserCreateDtoType>;

export type RecordCreateDtoType = Omit<RunRecord, "id" | "userId">;

export type RecordUpdateDtoType = Partial<RecordCreateDtoType>;

export type LoginDtoType = Pick<User, "email" | "password">;

export type RegisterDtoType = UserCreateDtoType;

