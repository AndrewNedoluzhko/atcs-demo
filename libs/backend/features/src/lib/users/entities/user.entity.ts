import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne,
  BeforeInsert,
  BeforeUpdate } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import * as  bcrypt from 'bcrypt'
import {IUser} from '@mtfs/shared/domain';
import { Base } from "../../base-entities/base.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity('users')
export class User extends Base implements IUser {

  @ApiProperty({
    type: String,
    description: 'The email address of the user.',
    example: 'user@example.com',
  })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @ApiProperty({
    type: String,
    description: 'The phone number of the user.',
    example: '+1234567890',
  })
  @Column({ type: 'varchar', length: 14, nullable: false })
  phoneNumber!: string;



  @ApiProperty({
    type: String,
    description: 'The first name of the user.',
    example: 'John',
  })
  @Column({ type: 'varchar', length: 120, nullable: false })
  firstname!: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the user.',
    example: 'Doe',
  })
  @Column({ type: 'varchar', length: 120, nullable: false })
  lastname!: string;  

  @ApiProperty({
    type: String,
    description: 'The refresh token of the user.',
    example: 'refreshTokenExample',
  })
  @Column({type: 'varchar', select: false, nullable: true })
  refreshToken: string | null | undefined;

  @ApiProperty({
    type: String,
    description: 'The password of the user.',
    example: 'Password12!',
  })
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string | undefined;

  @ApiProperty({
    type: String,
    description: 'The ID of the role associated with the user.',
    example: 'DCA76BCC-F6CD-4211-A9F5-CD4E24381EC8',
  })
  @Column()
  roleId!: string; 

  @ApiProperty({
    type: Role,
    description: 'The role associated with the user.',
  })
  @ManyToOne(()=> Role, (role)=> role.users, {
    eager: true
  })  
  @JoinColumn({ name: "roleId" })
  role!: Role

  @BeforeInsert()
  @BeforeUpdate()
  async hash(): Promise<void>{
    const salt = await bcrypt.genSalt();
    if(this.password){
      this.password = bcrypt.hashSync(this.password, salt);
    }
    if(this.refreshToken){
      this.refreshToken = await bcrypt.hashSync(this.refreshToken, salt)
    }
  }

  async veryfyPassword(enterdPassword: string): Promise<boolean | void> {
    console.log(`enterdPassword`);
    console.log(`enterdPassword - ${enterdPassword}`);
    console.log(`this.password`);
    console.log(`this.password - ${this.password}`);
    return await bcrypt.compare(enterdPassword, this.password as string) ;
  }

  async verifyRefreshToken(receivedRefreshToken: string): Promise<boolean | void>{
    console.log(`verifyRefreshToken`);
    console.log(`verifyRefreshToken - ${receivedRefreshToken}`);
    console.log(`this.refreshToken`);
    console.log(`this.refreshToken - ${this.refreshToken}`);
    return await bcrypt.compare(receivedRefreshToken, this.refreshToken as string);
  }
}