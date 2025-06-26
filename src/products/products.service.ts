import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    new Product(
      1,
      'Kitty Crackers',
      15000,
      'Sebuah crackers gurih untuk kucing',
    ),
  ];
  private nextId = 2;

  create(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = { id: this.nextId++, ...product };
    const existingProduct = this.products.some(
      (p) => p.name === newProduct.name,
    );
    if (existingProduct) {
      throw new ConflictException(
        `Product with name ${newProduct.name} already exists`,
      );
    }
    this.products.push(newProduct);
    return newProduct;
  }
  findAll(): Product[] {
    return this.products;
  }
  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
    return product;
  }
  update(id: number, update: Partial<Omit<Product, 'id'>>): Product {
    const product = this.findOne(id);
    Object.assign(product, update);
    return product;
  }
  remove(id: number): void {
    const removedproduct = this.products.find((product) => product.id === id);
    if (!removedproduct) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
    this.products.splice(this.products.indexOf(removedproduct), 1);
  }
}
