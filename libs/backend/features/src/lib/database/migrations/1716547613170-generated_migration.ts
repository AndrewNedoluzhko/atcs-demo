import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1716547613170 implements MigrationInterface {
    name = 'GeneratedMigration1716547613170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
