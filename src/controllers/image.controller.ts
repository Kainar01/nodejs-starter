import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
  Res,
  UploadedFile,
} from "routing-controllers";
import { singleton } from "tsyringe";
import { ImageService } from "../services";
import { TokenPayload } from "../types";

@singleton()
@JsonController("/images")
export class ImageController {
  public constructor(private imageService: ImageService) {}

  @Get("/")
  @Authorized()
  public getImages(@CurrentUser({ required: true }) user: TokenPayload) {
    return this.imageService.getImages(user.id);
  }

  @Post("/")
  @Authorized()
  public saveImage(
    @CurrentUser({ required: true }) user: TokenPayload,
    @UploadedFile("file", { required: true }) file: Express.Multer.File
  ) {
    return this.imageService.saveImage(file, user.id);
  }
}
