import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1639023812399 implements MigrationInterface {
    name = 'firstMigration1639023812399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "runRecord" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "time" double precision NOT NULL, "distance" double precision NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_c9e7c0a1273207cf8f3400ddc0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d2af2db0080c7a11873649b620" ON "runRecord" ("date") `);
        await queryRunner.query(`ALTER TABLE "runRecord" ADD CONSTRAINT "FK_94091fe3393e4d5ea14f95b903f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "runRecord" DROP CONSTRAINT "FK_94091fe3393e4d5ea14f95b903f"`);
        await queryRunner.query(`DROP INDEX "IDX_d2af2db0080c7a11873649b620"`);
        await queryRunner.query(`DROP TABLE "runRecord"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
