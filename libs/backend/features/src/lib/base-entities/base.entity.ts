import {IBase} from '@mtfs/shared/domain';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ApiTags('base entity')
export class Base implements IBase{
  
  @ApiProperty({
    type: String,
    readOnly: true,
    description: 'The unique identifier of the entity.',
    example: 'DCA76BCC-F6CD-4211-A9F5-CD4E24381EC8',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ 
    type: Date,
    example: 'datetime', 
    description: 'The date and time when the entity was created.' })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({
    type: Date, 
    example: 'datetime', 
    description: 'The date and time when the entity was last updated.' })
  @UpdateDateColumn()
  updatedAt!: Date;
}