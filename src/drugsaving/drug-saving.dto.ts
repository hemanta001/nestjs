import { ApiProperty } from '@nestjs/swagger';

export class DrugSavingDto {
  @ApiProperty({ required: false })
  take: number;
  @ApiProperty({ required: false })
  skip: number;
  // @ApiProperty({ required: false ,enum:["id","ward"]})
  // field: string;
  @ApiProperty({ required: false, enum: ['ASC', 'DESC'] })
  order: string;
}
