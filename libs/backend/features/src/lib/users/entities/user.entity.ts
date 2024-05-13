import {   Column, Entity,  } from "typeorm";
import {IUser} from '@mtfs/shared/domain';
import { Base } from "../../base-entity/base.entity";

@Entity('users')
export class User extends Base implements IUser {

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  phoneNumber!: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password!: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  firstname!: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  lastname!: string;  
}