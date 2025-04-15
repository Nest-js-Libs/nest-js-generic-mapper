import { Injectable } from '@nestjs/common';
import { UserEntity, AddressEntity, PostEntity } from './models';

@Injectable()
export class UserRepository {
  // Simulación de base de datos en memoria
  private users: UserEntity[] = [];

  constructor() {
    // Inicializar con algunos datos de ejemplo
    this.seedData();
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  findById(id: number): UserEntity | undefined {
    return this.users.find(user => user.id === id);
  }

  findWithPosts(id: number): UserEntity | undefined {
    const user = this.findById(id);
    if (!user) return undefined;
    
    // Simulamos que esta consulta trae los posts relacionados
    return user;
  }

  private seedData(): void {
    // Crear algunos usuarios de ejemplo
    const user1 = new UserEntity();
    user1.id = 1;
    user1.firstName = 'Juan';
    user1.lastName = 'Pérez';
    user1.email = 'juan.perez@example.com';
    user1.role = 'admin';
    user1.createdAt = new Date('2023-01-15');
    user1.updatedAt = new Date('2023-06-20');
    user1.address = new AddressEntity();
    user1.address.street = 'Calle Principal 123';
    user1.address.city = 'Madrid';
    user1.address.zipCode = '28001';
    user1.address.country = 'España';
    user1.posts = [
      this.createPost(1, 'Introducción a NestJS', 'NestJS es un framework progresivo de Node.js para crear aplicaciones del lado del servidor eficientes, confiables y escalables...', user1.id),
      this.createPost(2, 'Mapeo de objetos en TypeScript', 'El mapeo de objetos es una técnica común en el desarrollo de software que permite transformar datos de un formato a otro...', user1.id)
    ];

    const user2 = new UserEntity();
    user2.id = 2;
    user2.firstName = 'María';
    user2.lastName = 'González';
    user2.email = 'maria.gonzalez@example.com';
    user2.role = 'user';
    user2.createdAt = new Date('2023-03-10');
    user2.updatedAt = new Date('2023-05-15');
    user2.address = new AddressEntity();
    user2.address.street = 'Avenida Libertad 456';
    user2.address.city = 'Barcelona';
    user2.address.zipCode = '08001';
    user2.address.country = 'España';
    user2.posts = [
      this.createPost(3, 'Mis experiencias con TypeScript', 'TypeScript ha cambiado mi forma de programar. En este artículo comparto mis experiencias y mejores prácticas...', user2.id)
    ];

    const user3 = new UserEntity();
    user3.id = 3;
    user3.firstName = 'Carlos';
    user3.lastName = 'Rodríguez';
    user3.email = 'carlos.rodriguez@example.com';
    user3.role = 'editor';
    user3.createdAt = new Date('2023-02-20');
    user3.updatedAt = new Date('2023-07-05');
    user3.address = new AddressEntity();
    user3.address.street = 'Plaza Mayor 789';
    user3.address.city = 'Valencia';
    user3.address.zipCode = '46001';
    user3.address.country = 'España';
    user3.posts = [];

    this.users = [user1, user2, user3];
  }

  private createPost(id: number, title: string, content: string, authorId: number): PostEntity {
    const post = new PostEntity();
    post.id = id;
    post.title = title;
    post.content = content;
    post.createdAt = new Date();
    post.authorId = authorId;
    return post;
  }
}