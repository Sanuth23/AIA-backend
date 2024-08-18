import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { BlogImage } from './entities/blog-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog,BlogImage])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
