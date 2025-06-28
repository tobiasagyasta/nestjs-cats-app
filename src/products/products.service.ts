import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';
import { IProductsService } from './interfaces/products.service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(product: Omit<Product, 'id'>): Product | null {
    if (this.productsRepository.existsByName(product.name)) {
      return null;
    }
    return this.productsRepository.create(product);
  }

  findAll(): Product[] {
    return this.productsRepository.findAll();
  }

  findOne(id: number): Product | null {
    return this.productsRepository.findOne(id) ?? null;
  }

  update(id: number, update: Partial<Omit<Product, 'id'>>): Product | null {
    return this.productsRepository.update(id, update) ?? null;
  }

  remove(id: number): boolean {
    return this.productsRepository.remove(id);
  }
  existsByName(name: string): boolean {
    return this.productsRepository.existsByName(name);
  }
}
