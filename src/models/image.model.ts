import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity, Column, Repository, BaseEntity } from "typeorm";
import { Image } from "../types";
import { UserEntity } from "./user.model";

@Entity({ name: "image" })
export class ImageEntity extends BaseEntity implements Image {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public userId!: number;

  @Column()
  public link!: string;

  @Column()
  public key!: string;

  @ManyToOne(() => UserEntity, (user) => user.records, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn({ name: "userId" })
  public user!: UserEntity;
}

export type ImageRepository = Repository<ImageEntity>;
