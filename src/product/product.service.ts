import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    if (createProductDto.categoryId == null) {
      throw new BadRequestException('When creating a product, category id is a required field.');
    }

    try {
      createProductDto.createdAt = new Date();
      const product = this.productRepository.create(createProductDto);
      const productEntity = await this.productRepository.save(product);
      return productEntity ? productEntity : "Can't save the product. Please check the details & try again.";
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product', error.message);
    }
  }

  async findAll() {
    try {
      const allProducts: Product[] = await this.productRepository.find({
        relations: ['productImages']
      });

      if (allProducts) {
        let finalizeProducts: Product[] = allProducts.filter((element) => {
          if (element && element.deletedBy == null && element.categoryId != null) {
            return (element)
          }
        });

        finalizeProducts.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeProducts.length ? finalizeProducts : 'No Product found.';
      }
      return 'No Product found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve product', error.message);
    }
  }

  async findByCategoryId(categoryId: number) {
    try {
      const allProducts: Product[] = await this.productRepository.find({
        where: { categoryId: categoryId },
        relations: ['productImages']
      });

      if (allProducts) {
        let finalizeProducts: Product[] = allProducts.filter((element) => {
          if (element && element.deletedBy == null) {
            return (element)
          }
        });

        finalizeProducts.sort((a1, a2) =>
          a2.createdAt.getTime() - a1.createdAt.getTime()
        );

        return finalizeProducts.length == 0 ? finalizeProducts : 'No Product found.';
      }
      return 'No Product found.';
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve product', error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product: Product = await this.productRepository.findOne({
        where: { id },
        relations: ['productImages']
      });

      if (!product || product.deletedBy != null || product.categoryId == null) {
        throw new NotFoundException('No Matching Product to update.');
      }

      updateProductDto.updatedAt = new Date();
      Object.assign(product, updateProductDto);
      await this.productRepository.save(product);
      return 'Product updated successfully.';

    } catch (error) {
      throw new InternalServerErrorException('Failed to update product.', error.message);
    }
  }

  async remove(id: number, deletedBy: number) {
    try {
      const product: Product = await this.productRepository.findOne({
        where: { id }
      });

      if (!product || product.deletedBy != null) {
        throw new NotFoundException('No Matching Product to delete.');
      }

      product.deletedBy = deletedBy;
      product.deletedAt = new Date();
      await this.productRepository.save(product);
      return 'Product is deleted successfully.'

    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product.', error.message);
    }
  }
}
