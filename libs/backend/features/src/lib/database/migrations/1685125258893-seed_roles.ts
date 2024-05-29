import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

export class SeedRoles1715871858000 implements MigrationInterface {
  name = `SeedRoles1715871858000`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async up(queryRunner: QueryRunner): Promise<any> {

    const rolesRepo = queryRunner.manager.getRepository(Role);

    const userRole = rolesRepo.create({      
      name: 'User'
    });

    const adminRole = rolesRepo.create({ 
      name: 'Admin'
    });
    await rolesRepo.save([userRole, adminRole]);
  }  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<any> { }
}




