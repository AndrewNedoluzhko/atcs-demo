import { 
  IsEmail, 
  IsNotEmpty,  
  IsObject,  
  IsOptional,  
  IsPhoneNumber,  
  IsString,  
  IsStrongPassword, 
  IsUUID, 
  Length, 
  MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/entities/role.entity";
import { ICreateUser } from "@mtfs/shared/domain";

export class CreateUserDto implements ICreateUser {
    //email
    @ApiProperty({
      type: String,
      required: true,
      example:  `email@internet.com`,
      maxLength: 255
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email!: string;
  
    //password
    @ApiProperty({
      type: String,
      required: true,
      example: '!123Qwerty',
      minLength: 8
    })
    @IsStrongPassword({  
        minLength: 8,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1  
      },
      {
        message: `Password is not strong enough. Must contain: 8 characters, 1 number, 1 uppercase letter, 1 symbol`,
    })  
    @IsNotEmpty()
    @MaxLength(25)
    password!: string;
  
    //phoneNumber
    @ApiProperty({
      type: String,
      required: true,
      example: '+2347063644568',
      minLength: 10,
      maxLength: 16
    })
    @IsNotEmpty()
    @IsPhoneNumber(undefined, {message: 'Invalid phone number format'})
    @Length(10, 16)  
    phoneNumber!: string;
  
    //firstname
    @ApiProperty({
      type: String,
      required: true,
      example: 'Jonh'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)  
    firstname!: string;
  
    //lastname
    @ApiProperty({
      type: String,
      required: true,
      example: 'Doe',
      maxLength: 120
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)  
    lastname!: string;
  
    //roleId
    @ApiProperty({
      type: String,
      readOnly: true,
      example: 'DCA76BCC-F6CD-4211-A9F5-CD4E24381EC8',
    })
    @IsOptional()
    @IsUUID()
    roleId?: string; 
  
    //role 
    @ApiProperty({
      type: Role,
      readOnly: true,
      example: '{"id": "DCA76BCC-F6CD-4211-A9F5-CD4E24381EC8", "name": "user"}'
    })
    @IsOptional()
    @IsObject()
    role?: Role;   
}
