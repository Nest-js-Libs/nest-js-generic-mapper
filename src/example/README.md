# Ejemplo de uso de Generic Mapper

Este módulo de ejemplo demuestra las diferentes formas de utilizar el `MapperModule` para transformar objetos entre diferentes formatos (entidades a DTOs).

## Estructura del ejemplo

- `example.module.ts`: Módulo principal que importa el MapperModule
- `example.controller.ts`: Controlador con endpoints para demostrar diferentes tipos de mapeo
- `example.service.ts`: Servicio que utiliza el MapperService para realizar las transformaciones
- `user.repository.ts`: Repositorio simulado con datos en memoria
- `models.ts`: Definición de entidades y DTOs con decoradores de mapeo

## Casos de uso demostrados

1. **Mapeo simple de un objeto**: Transformación básica de una entidad a un DTO
   - Endpoint: `GET /mapper-example/users/:id`

2. **Mapeo de colecciones**: Transformación de arrays de objetos
   - Endpoint: `GET /mapper-example/users`

3. **Mapeo con validación estricta**: Validación de campos requeridos
   - Endpoint: `GET /mapper-example/users/:id/strict`

4. **Mapeo de objetos anidados**: Transformación de objetos con relaciones
   - Endpoint: `GET /mapper-example/users/:id/nested`

5. **Mapeo manual de propiedades específicas**: Transformación de propiedades seleccionadas
   - Endpoint: `GET /mapper-example/users/:id/posts`

## Decoradores utilizados

- `@MapFrom('sourceKey')`: Mapea desde una propiedad con nombre diferente
- `@Transform(fn)`: Aplica una función de transformación al valor
- `@Ignore()`: Excluye la propiedad del mapeo
- `@Required()`: Marca la propiedad como obligatoria

## Cómo probar

Para probar este ejemplo, inicie la aplicación NestJS y acceda a los endpoints mencionados anteriormente.

```bash
# Iniciar la aplicación
npm run start:dev

# Acceder a los endpoints (ejemplos)
curl http://localhost:3000/mapper-example/users
curl http://localhost:3000/mapper-example/users/1
curl http://localhost:3000/mapper-example/users/1/nested
```