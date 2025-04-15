// Importaciones necesarias
import { MapFrom, Transform, Required, Ignore } from '../../lib/mapper.decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


// DTO para dirección
export class AddressDto {
    @ApiProperty({ description: 'Nombre de la calle', example: 'Main Street' })
    @MapFrom('street')
    streetName: string;
    
    @ApiProperty({ description: 'Ciudad', example: 'New York' })
    city: string;
    
    @ApiProperty({ description: 'Código postal', example: '10001' })
    @MapFrom('zipCode')
    postalCode: string;
    
    @ApiProperty({ description: 'País', example: 'USA' })
    country: string;
    
    @ApiProperty({ description: 'Ubicación completa (ciudad, país)', example: 'New York, USA' })
    @Transform((obj) => `${obj.city}, ${obj.country}`)
    location: string;
  }
  
  // DTO para publicación
  export class PostDto {
    @ApiProperty({ description: 'ID único del post', example: 1 })
    id: number;
    
    @ApiProperty({ description: 'Título del post', example: 'Mi primer post' })
    title: string;
    
    @ApiProperty({ description: 'Resumen del contenido (máximo 100 caracteres)', example: 'Este es un resumen del contenido del post...' })
    @Transform((content) => content.length > 100 ? `${content.substring(0, 97)}...` : content)
    @MapFrom('content')
    summary: string;
    
    @ApiProperty({ description: 'Contenido completo del post', example: 'Este es el contenido completo del post.' })
    @MapFrom('content')
    body: string;
    
    @ApiProperty({ description: 'Fecha de publicación en formato ISO', example: '2023-01-01T12:00:00Z' })
    @Transform((date) => date instanceof Date ? date.toISOString() : date)
    publishedAt: string;
    
    @ApiProperty({ description: 'Fecha de creación', example: '2023-01-01T00:00:00.000Z' })
    createdAt: Date;
    
    @ApiProperty({ description: 'ID del autor', example: 1 })
    authorId: number;
  }
  
  // DTO para respuesta de usuario
  export class UserDto {
    @ApiProperty({ description: 'ID único del usuario', example: 1 })
    id: number;
    
    @ApiProperty({ description: 'Nombre del usuario', example: 'John' })
    @MapFrom('firstName')
    name: string;
    
    @ApiProperty({ description: 'Apellido del usuario', example: 'Doe' })
    @MapFrom('lastName')
    surname: string;
    
    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'john.doe@example.com' })
    @Required()
    email: string;
    
    @ApiProperty({ description: 'Rol del usuario (convertido a mayúsculas)', example: 'ADMIN' })
    @Transform((role) => role.toUpperCase())
    role: string;
    
    @ApiProperty({ description: 'Contraseña del usuario (ignorada en el mapeo)', example: '********' })
    @Ignore()
    password: string;
    
    @ApiProperty({ description: 'Nombre completo del usuario', example: 'John Doe' })
    fullName: string; // Se llenará con una transformación personalizada
    
    @ApiPropertyOptional({ description: 'Dirección del usuario', type: () => AddressDto })
    address: AddressDto;
    
    @ApiPropertyOptional({ description: 'Posts del usuario', type: () => [PostDto] })
    posts: PostDto[];
  }
  
  // DTO simplificado para listado
  export class UserListDto {
    @ApiProperty({ description: 'ID único del usuario', example: 1 })
    id: number;
    
    @ApiProperty({ description: 'Nombre completo del usuario', example: 'John Doe' })
    @Transform((obj) => `${obj.firstName} ${obj.lastName}`)
    fullName: string;
    
    @ApiProperty({ description: 'Correo electrónico del usuario', example: 'john.doe@example.com' })
    email: string;
  }