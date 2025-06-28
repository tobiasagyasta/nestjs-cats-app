import { Product } from '../entities/product.entity';

export interface IProductsRepository {
  findAll(): Product[];
  findOne(id: number): Product | undefined;
  create(product: Omit<Product, 'id'>): Product;
  update(id: number, update: Partial<Omit<Product, 'id'>>): Product | undefined;
  remove(id: number): boolean;
  existsByName(name: string): boolean;
}
