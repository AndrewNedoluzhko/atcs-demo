
import { IRole } from "@mtfs/shared/domain";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Base  } from "../../base-entities/base.entity";
import { User } from "../../users/entities/user.entity";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('roles')
@Entity('roles')
export class Role extends Base implements IRole {

  @ApiProperty({
    type: String,
    description: 'The name of the role.',
    example: 'admin',
  })
  @Column({type: 'varchar', length: 120, nullable: false})
  name!: string;

  @ApiProperty({
    type: [User],
    description: 'The list of users associated with this role.',
  })
  @OneToMany(()=> User, (user) => user.role)
  @JoinColumn()
  users!: User[];  
}