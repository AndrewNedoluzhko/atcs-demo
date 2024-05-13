import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1715350533935 implements MigrationInterface {
    name = 'GeneratedMigration1715350533935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "phoneNumber" character varying(14) NOT NULL, "password" character varying NOT NULL, "firstname" character varying(120) NOT NULL, "lastname" character varying(120) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
