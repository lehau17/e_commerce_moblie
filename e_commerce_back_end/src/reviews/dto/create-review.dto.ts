import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  review_text: string;

  @IsNumber()
  @IsNotEmpty()
  spu_id: number;
}
