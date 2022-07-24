import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrder1658433381420 implements MigrationInterface {
    name = 'addOrder1658433381420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_6c12a806868611b5e6764c2fd63"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_2816b24a6890481208cd815452d"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_status_enum" NOT NULL DEFAULT '1', "organizationId" uuid, "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."furniture_status_enum" RENAME TO "furniture_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."furniture_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "furniture" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "furniture" ALTER COLUMN "status" TYPE "public"."furniture_status_enum" USING "status"::"text"::"public"."furniture_status_enum"`);
        await queryRunner.query(`ALTER TABLE "furniture" ALTER COLUMN "status" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."furniture_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1096e6a21a8fe57923546a2e9cc" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_4c5fdb0fd8e11c703a80c0693c2" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_4c5fdb0fd8e11c703a80c0693c2"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1096e6a21a8fe57923546a2e9cc"`);
        await queryRunner.query(`CREATE TYPE "public"."furniture_status_enum_old" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "furniture" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "furniture" ALTER COLUMN "status" TYPE "public"."furniture_status_enum_old" USING "status"::"text"::"public"."furniture_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "furniture" ALTER COLUMN "status" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."furniture_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."furniture_status_enum_old" RENAME TO "furniture_status_enum"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD "organizationId" uuid`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_2816b24a6890481208cd815452d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_6c12a806868611b5e6764c2fd63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
