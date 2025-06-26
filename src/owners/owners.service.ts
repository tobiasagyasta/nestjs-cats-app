import { Injectable, NotFoundException } from '@nestjs/common';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  private owners: Owner[] = [
    new Owner(1, 'John Doe', 'john@email.com', '+6281234567890'),
  ];
  private nextId = 2;

  create(owner: Omit<Owner, 'id'>): Owner {
    const newOwner: Owner = { id: this.nextId++, ...owner };
    this.owners.push(newOwner);
    return newOwner;
  }

  findAll(): Owner[] {
    return this.owners;
  }

  findOne(id: number): Owner {
    const owner = this.owners.find((owner) => owner.id === id);
    if (!owner) {
      throw new NotFoundException(`Owner with id ${id} not found`);
    }
    return owner;
  }
  update(id: number, update: Partial<Omit<Owner, 'id'>>): Owner {
    const owner = this.findOne(id);
    Object.assign(owner, update);
    return owner;
  }
  remove(id: number): void {
    const removedOwner = this.owners.find((owner) => owner.id === id);
    if (!removedOwner) {
      throw new NotFoundException(`Owner with id ${id} not found`);
    }
    this.owners.splice(this.owners.indexOf(removedOwner), 1);
  }
}
