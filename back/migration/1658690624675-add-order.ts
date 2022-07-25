import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrder1658690624675 implements MigrationInterface {
    name = 'addOrder1658690624675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT '', "order_status" "public"."order_order_status_enum" NOT NULL DEFAULT '0', "organizationId" uuid, "creatorId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_4c5fdb0fd8e11c703a80c0693c2" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1096e6a21a8fe57923546a2e9cc" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_b4a453bc5f19e415c3e62fa8122" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_b4a453bc5f19e415c3e62fa8122"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1096e6a21a8fe57923546a2e9cc"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_4c5fdb0fd8e11c703a80c0693c2"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
