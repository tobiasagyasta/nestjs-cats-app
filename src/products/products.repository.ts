import { Product } from './entities/product.entity';
import { IProductsRepository } from './interfaces/products.repository.interface';

export class ProductsRepository implements IProductsRepository {
  private products: Product[] = [
    new Product(
      1,
      'Kitty Crackers',
      15000,
      'Sebuah crackers gurih untuk kucing',
    ),
    new Product(2, 'Whiskas', 20000, 'Makanan kucing'),
  ];
  private nextId = 3;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  create(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = { id: this.nextId++, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  update(
    id: number,
    update: Partial<Omit<Product, 'id'>>,
  ): Product | undefined {
    const product = this.findOne(id);
    if (product) {
      Object.assign(product, update);
      return product;
    }
    return undefined;
  }

  remove(id: number): boolean {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  existsByName(name: string): boolean {
    return this.products.some((p) => p.name === name);
  }
}
