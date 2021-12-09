import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Entity, Column, Repository, BaseEntity } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../types";
import { RunRecordEntity } from "./record.model";
import { ImageEntity } from "./image.model";

@Entity({ name: "user" })
@Unique(["email"])
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar" })
  public email!: string;

  @Column({ type: "varchar", select: false })
  public password!: string;

  @Column({ type: "varchar", nullable: true })
  public firstName!: string | null;

  @Column({ type: "varchar", nullable: true })
  public lastName!: string | null;

  @OneToMany(() => RunRecordEntity, (record) => record.user, {
    cascade: false,
  })
  public records?: RunRecordEntity[];
  
  @OneToMany(() => ImageEntity, (image) => image.user, {
    cascade: false,
  })
  public images?: ImageEntity[];

  public tempPassword!: string | null;

  @BeforeInsert()
  private hashPassword() {
    if (this.password !== null)
      this.password = bcrypt.hashSync(this.password, 10);
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeUpdate()
  private updatePassword(): void {
    // password has changed
    if (this.tempPassword !== this.password && this.password !== null) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}

export type UserRepository = Repository<UserEntity>;
