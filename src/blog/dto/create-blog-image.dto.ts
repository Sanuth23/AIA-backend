import { IsString, IsNumber } from 'class-validator';

export class CreateBlogImageDto {
    @IsString()
    path: string;

    @IsNumber()
    blogId: number;
}
