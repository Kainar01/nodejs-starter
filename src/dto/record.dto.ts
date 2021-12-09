import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";
import { RecordCreateDtoType, RecordUpdateDtoType } from "../types";

export class RecordCreateDto implements RecordCreateDtoType {
  @IsPositive()
  @IsNotEmpty()
  public distance!: number;
  
  @IsPositive()
  @IsNotEmpty()
  public time!: number;

  @IsNotEmpty()
  @IsDateString()
  public date!: Date;
}

export class RecordUpdateDto implements RecordUpdateDtoType {
  @IsOptional()
  @IsPositive()
  public distance!: number;

  @IsOptional()
  @IsPositive()
  public time!: number;

  @IsOptional()
  @IsDateString()
  public date!: Date;
}
