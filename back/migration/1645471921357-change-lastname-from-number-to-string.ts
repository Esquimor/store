import {MigrationInterface, QueryRunner} from "typeorm";

export class changeLastnameFromNumberToString1645471921357 implements MigrationInterface {
    name = 'changeLastnameFromNumberToString1645471921357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" integer`);
    }

}
