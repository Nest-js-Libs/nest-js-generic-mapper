# Generic Mapper Module

[![npm version](https://img.shields.io/npm/v/@nest-js/generic-mapper.svg)](https://www.npmjs.com/package/@nest-js/generic-mapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Módulo de mapeo automático y flexible para aplicaciones NestJS, diseñado para transformar objetos entre diferentes tipos de manera eficiente y tipo-segura.

## Características Principales

- 🔄 Mapeo automático basado en nombres de propiedades
- 🎯 Sistema de decoradores para control preciso
- 🛠 Transformaciones personalizables
- 📦 Soporte para objetos anidados y arrays
- ⚡ Alto rendimiento y tipo-seguro

## Instalación

```bash
npm install @nest-js/generic-mapper
```

## Configuración

```typescript
import { MapperModule } from '@nest-js/generic-mapper';

@Module({
  imports: [MapperModule],
})
export class AppModule {}
```

## Decoradores Disponibles

### @MapFrom(sourceKey: string)
Mapea una propiedad desde un campo con nombre diferente.

```typescript
export class UserDto {
  @MapFrom('firstName')
  name: string;
}
```

### @Transform(transformFn: (value: any) => any)
Aplica una transformación personalizada al valor.

```typescript
export class UserDto {
  @Transform(value => new Date(value))
  createdAt: Date;

  @Transform(value => value.join(', '))
  tags: string;
}
```

### @Ignore()
Excluye una propiedad del proceso de mapeo.

```typescript
export class UserDto {
  @Ignore()
  temporaryData: string;
}
```

### @Required()
Marca una propiedad como obligatoria durante el mapeo.

```typescript
export class UserDto {
  @Required()
  id: number;
}
```

## Ejemplos de Uso

### Mapeo Básico

```typescript
@Injectable()
export class UserService {
  constructor(private readonly mapperService: MapperService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.mapperService.map(dto, User);
  }
}
```

### Mapeo de Arrays

```typescript
const userDtos = [dto1, dto2, dto3];
const users = this.mapperService.mapArray(userDtos, User);
```

### Mapeo Bidireccional

```typescript
@Injectable()
export class UserMapper {
  constructor(private readonly mapperService: MapperService) {}

  toEntity(dto: UserDto): User {
    return this.mapperService.map(dto, User);
  }

  toDto(entity: User): UserDto {
    return this.mapperService.map(entity, UserDto);
  }
}
```

### Transformaciones Avanzadas

```typescript
export class ProductDto {
  @Transform(price => {
    if (typeof price === 'string') return parseFloat(price);
    return price;
  })
  price: number;

  @Transform(tags => Array.isArray(tags) ? tags : tags.split(','))
  tags: string[];
}
```

## Mejores Prácticas

1. **Tipado Fuerte**: Utiliza TypeScript para aprovechar el sistema de tipos.
2. **Validación**: Combina con class-validator para validación robusta.
3. **Transformaciones**: Mantén las transformaciones simples y específicas.
4. **Documentación**: Documenta los mapeos complejos para mantenibilidad.

## Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Crear tests para nuevas funcionalidades
2. Seguir las convenciones de código existentes
3. Actualizar la documentación según sea necesario

## Licencia

MIT