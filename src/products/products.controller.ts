import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './DTOs/create-product.dto';
import { UpdateProductDto } from './DTOs/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): {
    message: string;
    data: {
      id: number;
      name: string;
      price: number;
      description: string;
      priceFormatted: string;
    };
  } {
    try {
      const existing = this.productService.existsByName(createProductDto.name);
      if (existing) {
        throw new ConflictException({
          message: 'Product with this name already exists',
          error: 'duplicate product',
          statusCode: HttpStatus.CONFLICT,
        });
      }

      const created = this.productService.create(createProductDto);
      if (!created) {
        throw new InternalServerErrorException({
          message: 'Failed to create product',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      return {
        message: 'Product created successfully',
        data: {
          id: created.id,
          name: created.name,
          price: created.price,
          description: created.description,
          priceFormatted: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
          }).format(created.price),
        },
      };
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException({
        message: 'Failed to create product',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get()
  getAllProducts(): Array<{
    id: number;
    name: string;
    price: number;
    description: string;
    priceFormatted: string;
  }> {
    try {
      const products = this.productService.findAll();
      return products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        priceFormatted: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'IDR',
        }).format(product.price),
      }));
    } catch {
      throw new InternalServerErrorException({
        message: 'Something went wrong on our side',
        error: 'internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    try {
      const product = this.productService.findOne(id);
      if (!product) {
        throw new NotFoundException({
          message: `Product with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return product;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException({
        message: 'Failed to fetch product',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): {
    message: string;
    data: Product;
  } {
    try {
      const existing = this.productService.findOne(id);
      if (!existing) {
        throw new NotFoundException({
          message: `Product with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      const updated = this.productService.update(id, updateProductDto);
      if (!updated) {
        throw new NotFoundException({
          message: `Product with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return {
        message: `Product with ID ${id} updated successfully`,
        data: updated,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException({
        message: 'Failed to update product',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    try {
      const existing = this.productService.findOne(id);
      if (!existing) {
        throw new NotFoundException({
          message: `Product with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      this.productService.remove(id);
      return {
        message: `Product with ID ${id} has been removed.`,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException({
        message: 'Failed to delete product',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
