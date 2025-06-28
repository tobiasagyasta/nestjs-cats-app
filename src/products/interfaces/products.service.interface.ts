import { Product } from '../entities/product.entity';

export interface IProductsService {
  create(product: Omit<Product, 'id'>): Product | null;
  findAll(): Product[];
  findOne(id: number): Product | null;
  update(id: number, update: Partial<Omit<Product, 'id'>>): Product | null;
  remove(id: number): boolean;
}
