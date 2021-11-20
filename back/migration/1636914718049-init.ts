import {MigrationInterface, QueryRunner} from "typeorm";

export class init1636914718049 implements MigrationInterface {
    name = 'init1636914718049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feature_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_d5fa99d35bfe52ae71ccadc09d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "furnitureCategoryId" uuid, CONSTRAINT "PK_9dd4efe60df9de0ba0e443c2d33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_56522900ffce4cb91586981d5ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'normal', 'validator')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" integer NOT NULL, "phone" boolean NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'admin', "organizationId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('created')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_status_enum" NOT NULL DEFAULT 'created', "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_01a7c973d9f30479647e44f9892" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line_feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "values" text NOT NULL, "orderLineId" uuid, "featureId" uuid, CONSTRAINT "PK_31f6a9ce2bf87d5ec72f5c42d4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "values" text NOT NULL, "type" character varying NOT NULL, "featureCategoryId" uuid, "furnitureCategoryId" uuid, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture_category_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_fe0659cf42fc36fcc5f04b729e4" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f0a0245acd2a13246a31f80a4" ON "furniture_category_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c1fb46c164d44d931b8759097" ON "furniture_category_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "furniture" ADD CONSTRAINT "FK_44aa506a27eed31a64eb724ac5a" FOREIGN KEY ("furnitureCategoryId") REFERENCES "furniture_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture_category" ADD CONSTRAINT "FK_a273e8388795dbfe7f355346fa8" FOREIGN KEY ("parentId") REFERENCES "furniture_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line" ADD CONSTRAINT "FK_239cfca2a55b98b90b6bef2e44f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line_feature" ADD CONSTRAINT "FK_bc1e440814181e08aed64045ea6" FOREIGN KEY ("orderLineId") REFERENCES "order_line"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line_feature" ADD CONSTRAINT "FK_cbb57ba59ba30f95ea473ac102f" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feature" ADD CONSTRAINT "FK_8fcbde65f11217e54f2d5be5856" FOREIGN KEY ("featureCategoryId") REFERENCES "feature_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feature" ADD CONSTRAINT "FK_2c6e1777201d07d7142cf381c43" FOREIGN KEY ("furnitureCategoryId") REFERENCES "furniture_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture_category_closure" ADD CONSTRAINT "FK_7f0a0245acd2a13246a31f80a46" FOREIGN KEY ("id_ancestor") REFERENCES "furniture_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "furniture_category_closure" ADD CONSTRAINT "FK_4c1fb46c164d44d931b87590974" FOREIGN KEY ("id_descendant") REFERENCES "furniture_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "furniture_category_closure" DROP CONSTRAINT "FK_4c1fb46c164d44d931b87590974"`);
        await queryRunner.query(`ALTER TABLE "furniture_category_closure" DROP CONSTRAINT "FK_7f0a0245acd2a13246a31f80a46"`);
        await queryRunner.query(`ALTER TABLE "feature" DROP CONSTRAINT "FK_2c6e1777201d07d7142cf381c43"`);
        await queryRunner.query(`ALTER TABLE "feature" DROP CONSTRAINT "FK_8fcbde65f11217e54f2d5be5856"`);
        await queryRunner.query(`ALTER TABLE "order_line_feature" DROP CONSTRAINT "FK_cbb57ba59ba30f95ea473ac102f"`);
        await queryRunner.query(`ALTER TABLE "order_line_feature" DROP CONSTRAINT "FK_bc1e440814181e08aed64045ea6"`);
        await queryRunner.query(`ALTER TABLE "order_line" DROP CONSTRAINT "FK_239cfca2a55b98b90b6bef2e44f"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "furniture_category" DROP CONSTRAINT "FK_a273e8388795dbfe7f355346fa8"`);
        await queryRunner.query(`ALTER TABLE "furniture" DROP CONSTRAINT "FK_44aa506a27eed31a64eb724ac5a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c1fb46c164d44d931b8759097"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f0a0245acd2a13246a31f80a4"`);
        await queryRunner.query(`DROP TABLE "furniture_category_closure"`);
        await queryRunner.query(`DROP TABLE "feature"`);
        await queryRunner.query(`DROP TABLE "order_line_feature"`);
        await queryRunner.query(`DROP TABLE "order_line"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "furniture_category"`);
        await queryRunner.query(`DROP TABLE "furniture"`);
        await queryRunner.query(`DROP TABLE "feature_category"`);
    }

}
