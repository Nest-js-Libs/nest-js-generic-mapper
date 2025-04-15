// Entidad de usuario (simulando una entidad de base de datos)
export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  address: AddressEntity;
  posts: PostEntity[];
}

// Entidad de dirección
export class AddressEntity {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

// Entidad de publicación
export class PostEntity {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  authorId: number;
}

