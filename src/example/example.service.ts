import { Injectable } from '@nestjs/common';
import { MapperService } from '../lib/mapper.service';
import { UserRepository } from './user.repository';
import { PostDto, UserDto, UserListDto } from './controller/dtos';

@Injectable()
export class ExampleService {
  constructor(
    private readonly mapperService: MapperService,
    private readonly userRepository: UserRepository,
  ) {}

  // Ejemplo 1: Mapeo simple de un objeto
  getUserById(id: number): UserDto | undefined {
    const user = this.userRepository.findById(id);
    if (!user) return undefined;
    
    // Mapeo básico de un objeto
    const userDto = this.mapperService.map(user, UserDto);
    
    // Podemos realizar transformaciones adicionales después del mapeo
    userDto.fullName = `${user.firstName} ${user.lastName}`;
    
    return userDto;
  }

  // Ejemplo 2: Mapeo de una colección de objetos
  getAllUsers(): UserListDto[] {
    const users = this.userRepository.findAll();
    
    // Mapeo de un array de objetos
    return this.mapperService.mapArray(users, UserListDto);
  }

  // Ejemplo 3: Mapeo con validación estricta
  getUserWithStrictMapping(id: number): UserDto | undefined {
    const user = this.userRepository.findById(id);
    if (!user) return undefined;
    
    // Mapeo con opciones de validación estricta
    return this.mapperService.map(user, UserDto, { strictMapping: true });
  }

  // Ejemplo 4: Mapeo de objetos anidados
  getUserWithNestedObjects(id: number): UserDto | undefined {
    const user = this.userRepository.findWithPosts(id);
    if (!user) return undefined;
    
    // El mapeo maneja automáticamente objetos anidados
    return this.mapperService.map(user, UserDto);
  }

  // Ejemplo 5: Mapeo manual de propiedades específicas
  getUserPosts(userId: number): PostDto[] | undefined {
    const user = this.userRepository.findWithPosts(userId);
    if (!user || !user.posts) return undefined;
    
    // Mapeo de un array de objetos anidados
    return this.mapperService.mapArray(user.posts, PostDto);
  }
}