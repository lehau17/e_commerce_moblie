import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
  spu_id: number;
  @IsString()
  @IsNotEmpty()
  comment_text: string;
}
