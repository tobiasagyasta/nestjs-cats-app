import { UserRole } from '../common/user-role.enum';
export class User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  roles: UserRole[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
