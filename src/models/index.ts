import { ResourceWithOptions } from "admin-bro";
import { ImageEntity } from "./image.model";
import { RunRecordEntity } from "./record.model";
import { UserEntity } from "./user.model";

export const entities = [RunRecordEntity, UserEntity, ImageEntity];

export const resources: ResourceWithOptions[] = [
  {
    resource: UserEntity,
    options: {},
  },
  {
    resource: RunRecordEntity,
    options: {},
  },
  {
    resource: ImageEntity,
    options: {},
  },
];
