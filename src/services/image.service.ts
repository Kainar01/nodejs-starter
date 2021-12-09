import { singleton } from "tsyringe";
import { Connection } from "typeorm";
import { ImageEntity, ImageRepository } from "../models/image.model";
import { Client as MinioClient } from "minio";
import { ConfigWrapper } from "../config/constraint";

@singleton()
export class ImageService {
  private imageRepository: ImageRepository;
  private bucket: string;
  private publicUrl: string;

  constructor(
    connection: Connection,
    private minioClient: MinioClient,
    { config }: ConfigWrapper
  ) {
    this.imageRepository = connection.getRepository(ImageEntity);
    this.bucket = config.getTyped("minio").bucket;
    this.publicUrl = config.getTyped("minio").publicUrl;
  }

  public async saveImage(file: Express.Multer.File, userId: number) {
    const key = `${new Date().toISOString()}-${userId}.jpg`;
    await this.minioClient.putObject(this.bucket, key, file.buffer);
    const image = this.imageRepository.create({
      userId,
      key,
      link: `${this.publicUrl}/${this.bucket}/${key}`,
    });
    return this.imageRepository.save(image);
  }

  public getImages(userId: number) {
    return this.imageRepository.find({ userId });
  }
}
