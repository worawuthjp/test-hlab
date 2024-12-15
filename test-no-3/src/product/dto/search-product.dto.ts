import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class SearchProductDto {
  @IsString()
  query: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;
}
