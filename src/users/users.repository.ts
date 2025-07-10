import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { DatabaseService } from 'src/database/database.service';
import { UserRole } from './common/user-role.enum';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const now = new Date();
    const res = await this.db.getClient().query(
      `INSERT INTO users (email, password, full_name, roles, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING *`,
      [
        user.email,
        user.password,
        user.fullName,
        user.roles,
        user.isActive,
        now,
      ],
    );
    return res.rows[0];
  }

  async findAll(): Promise<User[]> {
    const res = await this.db.getClient().query('SELECT * FROM users');
    return res.rows;
  }

  async findOne(id: number): Promise<User | undefined> {
    const res = await this.db
      .getClient()
      .query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  }

  async update(
    id: number,
    update: Partial<Omit<User, 'id'>>,
  ): Promise<User | undefined> {
    const now = new Date();
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(update)) {
      fields.push(`${key} = $${index++}`);
      values.push(value);
    }
    values.push(now);
    fields.push(`updated_at = $${index}`);
    values.push(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index + 1} RETURNING *`;

    const res = await this.db.getClient().query(query, values);
    return res.rows[0];
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.db
      .getClient()
      .query('DELETE FROM users WHERE id = $1', [id]);
    return res.rowCount > 0;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const res = await this.db
      .getClient()
      .query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  }
}
