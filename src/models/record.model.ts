import {
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  Entity,
  Column,
  Repository,
  BaseEntity,
} from "typeorm";
import { RunRecord } from "../types";
import { UserEntity } from "./user.model";

@Entity({ name: "runRecord" })
export class RunRecordEntity extends BaseEntity implements RunRecord {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "int" })
  public userId!: number;

  @Column({ type: "float" })
  public time!: number;

  @Column({ type: "float" })
  public distance!: number;

  @Index() // index to query efficiently by date
  @Column({ type: "timestamptz" }) // Recommended
  public date!: Date;

  @ManyToOne(() => UserEntity, (user) => user.records, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn({ name: "userId" })
  public user!: UserEntity;
}

export type RunRecordRepository = Repository<RunRecordEntity>;
