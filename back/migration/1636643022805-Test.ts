import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1636643022805 implements MigrationInterface {
    name = 'Test1636643022805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feature" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "values" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d5fa99d35bfe52ae71ccadc09d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9dd4efe60df9de0ba0e443c2d33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "furniture_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_56522900ffce4cb91586981d5ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "model" ("id" SERIAL NOT NULL, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_01a7c973d9f30479647e44f9892" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line_feature" ("id" SERIAL NOT NULL, "values" character varying NOT NULL, CONSTRAINT "PK_31f6a9ce2bf87d5ec72f5c42d4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" integer NOT NULL, "phone" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "order_line_feature"`);
        await queryRunner.query(`DROP TABLE "order_line"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "model"`);
        await queryRunner.query(`DROP TABLE "furniture_category"`);
        await queryRunner.query(`DROP TABLE "furniture"`);
        await queryRunner.query(`DROP TABLE "feature_category"`);
        await queryRunner.query(`DROP TABLE "feature"`);
    }

}
