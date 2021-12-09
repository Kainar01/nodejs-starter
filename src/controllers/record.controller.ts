import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { singleton } from "tsyringe";
import { RecordService } from "../services";
import { RecordCreateDto, RecordUpdateDto } from "../dto";
import { TokenPayload } from "../types";

@singleton()
@JsonController("/records")
export class RecordController {
  public constructor(private recordService: RecordService) {}

  @Get("/reports")
  @Authorized()
  public report(@CurrentUser({ required: true }) user: TokenPayload) {
    return this.recordService.reportByWeek(user.id);
  }

  @Get("/")
  @Authorized()
  public all(@CurrentUser({ required: true }) user: TokenPayload) {
    return this.recordService.all(user.id);
  }

  @Get("/:id")
  @Authorized()
  public one(
    @Param("id") id: number,
    @CurrentUser({ required: true }) user: TokenPayload
  ) {
    return this.recordService.one(id, user.id);
  }

  @Delete("/:id")
  @Authorized()
  public delete(
    @Param("id") id: number,
    @CurrentUser({ required: true }) user: TokenPayload
  ) {
    return this.recordService.delete(id, user.id);
  }

  @Post("/")
  @Authorized()
  public create(
    @CurrentUser({ required: true }) user: TokenPayload,
    @Body() data: RecordCreateDto
  ) {
    return this.recordService.create({ ...data, userId: user.id });
  }

  @Put("/:id")
  @Authorized()
  public update(
    @CurrentUser({ required: true }) user: TokenPayload,
    @Param("id") id: number,
    @Body() data: RecordUpdateDto
  ) {
    return this.recordService.update(data, id, user.id);
  }
}
