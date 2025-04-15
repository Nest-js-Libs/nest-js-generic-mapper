# Módulo de Mappers Genéricos

### @nest-js/generic-mapper

[![npm version](https://img.shields.io/npm/v/@nest-js/generic-mapper.svg)](https://www.npmjs.com/package/@nest-js/generic-mapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este módulo proporciona una solución flexible y reutilizable para el mapeo automático entre diferentes tipos de objetos en una aplicación NestJS.

## Características

- Mapeo automático entre objetos basado en nombres de propiedades
- Decoradores personalizados para control fino del mapeo
- Soporte para transformaciones personalizadas
- Manejo de propiedades anidadas y arrays
- Mapeo bidireccional

## Instalación

El módulo está incluido en el proyecto base. Para utilizarlo, simplemente importa `MapperModule` en tu módulo:

```typescript
import { MapperModule } from './mapper/mapper.module';

@Module({
  imports: [MapperModule],
})
export class YourModule {}
```

## Uso Básico

### Mapeo Simple

```typescript
import { MapperService } from './mapper/mapper.service';

@Injectable()
export class YourService {
  constructor(private readonly mapperService: MapperService) {}

  transform(dto: UserDto): UserEntity {
    return this.mapperService.map(dto, UserEntity);
  }
}
```

### Uso de Decoradores

```typescript
import { MapFrom, Transform, Ignore } from './mapper/mapper.decorators';

export class UserDto {
  @MapFrom('firstName') // Mapea desde una propiedad diferente
  name: string;

  @Transform(value => new Date(value)) // Transforma el valor
  createdAt: Date;

  @Ignore() // Ignora esta propiedad durante el mapeo
  temporaryField: string;
}
```

### Mapeo de Arrays

```typescript
const dtos = [userDto1, userDto2];
const entities = this.mapperService.mapArray(dtos, UserEntity);
```

## Mejores Prácticas

1. Define interfaces claras para tus DTOs y entidades
2. Utiliza decoradores para casos especiales de mapeo
3. Mantén la consistencia en la nomenclatura de propiedades
4. Documenta las transformaciones personalizadas
5. Utiliza tipos genéricos para mejor seguridad de tipos

## Ejemplos Avanzados

### Mapeo Bidireccional

```typescript
@Injectable()
export class UserMapper {
  constructor(private readonly mapperService: MapperService) {}

  toEntity(dto: UserDto): UserEntity {
    return this.mapperService.map(dto, UserEntity);
  }

  toDto(entity: UserEntity): UserDto {
    return this.mapperService.map(entity, UserDto);
  }
}
```

### Transformaciones Personalizadas

```typescript
export class UserDto {
  @Transform(value => {
    if (typeof value === 'string') {
      return value.split(',').map(Number);
    }
    return value;
  })
  permissions: number[];
}
```

## Contribución

Si encuentras algún problema o tienes sugerencias de mejora, no dudes en contribuir al proyecto.