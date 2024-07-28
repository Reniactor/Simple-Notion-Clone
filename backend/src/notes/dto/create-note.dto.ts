import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  archived: boolean = false;

  @ApiProperty({ required: false, nullable: true })
  categoryId?: number;
}
