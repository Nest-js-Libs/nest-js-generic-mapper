import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExampleService } from '../example.service';
import { UserDto, UserListDto, PostDto } from './dtos';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Mapper Example')
@Controller('mapper-example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) { }

    // Ejemplo 1: Mapeo simple de un objeto
    @ApiOperation({ summary: 'Obtener un usuario por ID', description: 'Ejemplo de mapeo simple de un objeto' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
    @ApiOkResponse({ description: 'Usuario encontrado', type: UserDto })
    @ApiResponse({ status: 200, description: 'Mensaje cuando el usuario no es encontrado', schema: { properties: { message: { type: 'string' } } } })
    @Get('users/:id')
    getUser(@Param('id', ParseIntPipe) id: number): UserDto | { message: string } {
        const user = this.exampleService.getUserById(id);
        if (!user) {
            return { message: 'Usuario no encontrado' };
        }
        return user;
    }

    // Ejemplo 2: Mapeo de una colección de objetos
    @ApiOperation({ summary: 'Obtener todos los usuarios', description: 'Ejemplo de mapeo de una colección de objetos' })
    @ApiOkResponse({ description: 'Lista de usuarios', type: [UserListDto] })
    @Get('users')
    getAllUsers(): UserListDto[] {
        return this.exampleService.getAllUsers();
    }

    // Ejemplo 3: Mapeo con validación estricta
    @ApiOperation({ summary: 'Obtener usuario con mapeo estricto', description: 'Ejemplo de mapeo con validación estricta' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
    @ApiOkResponse({ description: 'Usuario encontrado', type: UserDto })
    @ApiResponse({ status: 200, description: 'Mensaje de error o usuario no encontrado', schema: { properties: { message: { type: 'string' } } } })
    @Get('users/:id/strict')
    getUserWithStrictMapping(
        @Param('id', ParseIntPipe) id: number,
    ): UserDto | { message: string } {
        try {
            const user = this.exampleService.getUserWithStrictMapping(id);
            if (!user) {
                return { message: 'Usuario no encontrado' };
            }
            return user;
        } catch (error) {
            return { message: `Error de validación: ${error.message}` };
        }
    }

    // Ejemplo 4: Mapeo de objetos anidados
    @ApiOperation({ summary: 'Obtener usuario con objetos anidados', description: 'Ejemplo de mapeo de objetos anidados' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
    @ApiOkResponse({ description: 'Usuario con objetos anidados', type: UserDto })
    @ApiResponse({ status: 200, description: 'Mensaje cuando el usuario no es encontrado', schema: { properties: { message: { type: 'string' } } } })
    @Get('users/:id/nested')
    getUserWithNestedObjects(
        @Param('id', ParseIntPipe) id: number,
    ): UserDto | { message: string } {
        const user = this.exampleService.getUserWithNestedObjects(id);
        if (!user) {
            return { message: 'Usuario no encontrado' };
        }
        return user;
    }

    // Ejemplo 5: Mapeo manual de propiedades específicas
    @ApiOperation({ summary: 'Obtener posts de un usuario', description: 'Ejemplo de mapeo manual de propiedades específicas' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
    @ApiOkResponse({ description: 'Lista de posts del usuario', type: [PostDto] })
    @ApiResponse({ status: 200, description: 'Mensaje cuando el usuario o posts no son encontrados', schema: { properties: { message: { type: 'string' } } } })
    @Get('users/:id/posts')
    getUserPosts(
        @Param('id', ParseIntPipe) id: number,
    ): PostDto[] | { message: string } {
        const posts = this.exampleService.getUserPosts(id);
        if (!posts) {
            return { message: 'Usuario o posts no encontrados' };
        }
        return posts;
    }
}