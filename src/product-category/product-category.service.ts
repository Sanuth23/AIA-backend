import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory) private readonly categoryRepository: Repository<ProductCategory>
  ) { }

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    if (createProductCategoryDto.name == null) {
      throw new BadRequestException('When creating a product category, name is a required field.');
    }

    try {
      createProductCategoryDto.createdAt = new Date();
      const category = this.categoryRepository.create(createProductCategoryDto);
      const categoryEntity = await this.categoryRepository.save(category);;
      return categoryEntity != null ? categoryEntity : "Can't save the product category. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product category', error.message);
    }
  }

  async findAll() {
    try {
      const allCategories: ProductCategory[] = await this.categoryRepository.find({
        relations: ['products', 'memberReferences'],
      });

      if (allCategories) {
        let finalizeCategories: ProductCategory[] = allCategories.filter((element) => {
          if (element.deletedBy == null) {
            return (element)
          }
        });

        finalizeCategories.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeCategories.length == 0 ? 'No Product Category found.' : finalizeCategories;
      }
      return 'No Product Category found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve product category', error.message);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (category == null || category.deletedBy != null) {
        throw new NotFoundException('Product Category not found for the given ID.');
      }
      
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find product category.', error.message);
    }
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: []
      });

      if (category == null || category.deletedBy != null) {
        throw new NotFoundException('No Matching Product Category to update.');
      }

      updateProductCategoryDto.updatedAt = new Date();
      Object.assign(category, updateProductCategoryDto);
      await this.categoryRepository.save(category);
      return "Product Category updated successfully.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product category', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id }
      });

      if (category == null || category.deletedAt != null) {
        throw new NotFoundException('There is no Product Category to delete.');
      }

      category.deletedBy = deletedBy;
      category.deletedAt = new Date();
      await this.categoryRepository.save(category);
      return 'Product Category is deleted successfully.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product category', error.message);
    }
  }
}
