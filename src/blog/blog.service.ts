import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>
  ) { }

  async create(createBlogDto: CreateBlogDto) {
    if (createBlogDto.createdBy == null) {
      throw new BadRequestException('When creating a blog, user id is a required field.');
    }

    try {
      createBlogDto.createdAt = new Date();
      const blog = this.blogRepository.create(createBlogDto);
      const blogEntity = await this.blogRepository.save(blog);
      return blogEntity ? blogEntity : "Can't save the blog. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create blog', error.message);
    }
  }

  async findAll() {
    try {
      const allBlogs: Blog[] = await this.blogRepository.find({
        relations: ['blogImages']
      });

      if (allBlogs) {
        let finalizeBlogs: Blog[] = allBlogs.filter((element) => {
          if (element && element.deletedBy == null && element.createdBy != null) {
            return (element)
          }
        });

        finalizeBlogs.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeBlogs.length ? finalizeBlogs : 'No Blog found.';
      }
      return 'No Blog found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve blog', error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      const blog: Blog = await this.blogRepository.findOne({
        where: { id },
        relations: ['blogImages']
      });

      if (!blog || blog.deletedBy != null) {
        throw new NotFoundException('No Matching Blog to update.');
      }

      updateBlogDto.updatedAt = new Date();
      Object.assign(blog, updateBlogDto);
      await this.blogRepository.save(blog);
      return 'Blog updated successfully.';

    } catch (error) {
      throw new InternalServerErrorException('Failed to update blog.', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const blog: Blog = await this.blogRepository.findOne({
        where: { id },
      });

      if (!blog || blog.deletedBy != null) {
        throw new NotFoundException('No Matching Blog to update.');
      }

      blog.deletedBy = deletedBy;
      blog.deletedAt = new Date();
      await this.blogRepository.save(blog);
      return 'Blog is deleted successfully.'

    } catch (error) {
      throw new InternalServerErrorException('Failed to delete blog.', error.message);
    }
  }
}
