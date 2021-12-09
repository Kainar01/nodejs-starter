import { singleton } from "tsyringe";
import { Connection } from "typeorm";
import { RecordCreateDtoType, RecordUpdateDtoType, RunRecord } from "../types";
import { AuthService } from ".";
import { RunRecordEntity, RunRecordRepository } from "../models/record.model";

@singleton()
export class RecordService {
  private recordRepository: RunRecordRepository;
  constructor(connection: Connection, private authService: AuthService) {
    this.recordRepository = connection.getRepository(RunRecordEntity);
  }

  public all(userId: number) {
    return this.recordRepository.find({
      where: { userId },
    });
  }

  public one(id: number, userId: number) {
    return this.recordRepository.findOne({ id, userId });
  }

  public create(dto: RecordCreateDtoType & Pick<RunRecord, "userId">) {
    const record = this.recordRepository.create({ ...dto });
    return this.recordRepository.save(record);
  }

  public async update(dto: RecordUpdateDtoType, id: number, userId: number) {
    return this.recordRepository.update({ id, userId }, dto);
  }

  public delete(id: number, userId: number) {
    return this.recordRepository.delete({ userId, id });
  }

  public reportByWeek(userId: number) {
    return this.recordRepository.query(
      `WITH
    dates
    AS
    (
        SELECT date_trunc('day', dd)::date AS dt
        FROM generate_series
    ( 
        (select date_trunc('week', MIN(r.date)::timestamp)::date  from "runRecord" as r where r."userId"=$1)::timestamp,
    (select (date_trunc('week', MAX(r.date)::timestamp)+'6 days'::interval)::date 
    from "runRecord" as r where r."userId"=$1)::timestamp,
        '1 day'::interval) dd
    ),
    cte AS
    (
        SELECT t1.dt, r.date, r.distance, r.time,
        EXTRACT(week from t1.dt) week
    FROM dates t1
        LEFT JOIN "runRecord" r
        ON t1.dt = r.date::date and r."userId" =$1
    )

    SELECT
        MIN(dt)::text || ' / ' || MAX(dt) AS DATE_TIME,
        CAST(ROUND(COALESCE(SUM(distance), 0)::numeric, 2) as double precision) AS total_distance,
        CAST(ROUND(COALESCE(SUM(distance)/SUM(time), 0)::numeric, 2) as double precision) as avg_speed,
        CAST(ROUND(COALESCE(AVG(time), 0)::numeric, 2) as double precision) as avg_time, 
        ROW_NUMBER() OVER( order by week)::int as week
    FROM cte
    GROUP BY
        week
    ORDER BY
        MIN
    (dt);`,
      [userId]
    );
  }
}
