import { Injectable, BadRequestException } from '@nestjs/common';
import 'reflect-metadata';
import { getMappingMetadata } from './mapper.decorators';

export type Constructor<T> = new (...args: any[]) => T;

export interface MapperOptions {
  strictMapping?: boolean;
}

@Injectable()
export class MapperService {
  /**
   * Mapea un objeto de origen a un tipo de destino
   * @param source Objeto de origen
   * @param targetType Tipo de destino
   */
  map<S extends object, T extends object>(
    source: S,
    targetType: Constructor<T>,
    options: MapperOptions = {},
  ): T {
    const target = new targetType();
    return this.mapProperties(
      source,
      target as Record<string, any>,
      targetType,
      options,
    ) as T;
  }

  /**
   * Mapea un array de objetos de origen a un array de objetos de destino
   * @param sources Array de objetos de origen
   * @param targetType Tipo de destino
   */
  mapArray<S extends object, T extends object>(
    sources: S[],
    targetType: Constructor<T>,
    options: MapperOptions = {},
  ): T[] {
    return sources.map(source => this.map(source, targetType, options));
  }

  /**
   * Mapea las propiedades de un objeto de origen a un objeto de destino
   * @param source Objeto de origen
   * @param target Objeto de destino
   */
  private mapProperties<S extends object, T extends object>(
    source: S,
    target: Record<string, any>,
    targetType: Constructor<T>,
    options: MapperOptions,
  ): Record<string, any> {
    if (!source) return target;

    if (options.strictMapping) {
      this.validateRequiredFields(source, targetType);
    }

    Object.keys(source as Record<string, any>).forEach(key => {
      const sourceValue = (source as Record<string, any>)[key];

      if (this.isPrimitiveOrDate(sourceValue)) {
        target[key] = sourceValue;
      } else if (Array.isArray(sourceValue)) {
        target[key] = this.mapArrayProperties(sourceValue);
      } else if (typeof sourceValue === 'object' && sourceValue !== null) {
        const targetSubObj = target[key] ?? {};
        target[key] = this.mapProperties(
          sourceValue,
          targetSubObj,
          targetType,
          options,
        );
      }
    });

    return target;
  }

  /**
   * Mapea un array de propiedades
   * @param array Array de propiedades a mapear
   */
  private mapArrayProperties<T extends object>(array: any[]): T[] {
    return array.map(item => {
      if (this.isPrimitiveOrDate(item)) return item;
      if (Array.isArray(item)) return this.mapArrayProperties(item);
      return this.mapProperties(
        item,
        {},
        Object as unknown as Constructor<T>,
        {},
      );
    });
  }

  /**
   * Verifica si un valor es primitivo o una fecha
   * @param value Valor a verificar
   */
  private isPrimitiveOrDate(value): boolean {
    return (
      value === null ||
      value === undefined ||
      typeof value !== 'object' ||
      value instanceof Date
    );
  }

  /**
   * Valida que todos los campos requeridos estén presentes en el objeto fuente
   * @param source Objeto fuente
   * @param targetType Tipo de destino
   */
  private validateRequiredFields<S extends object, T extends object>(
    source: S,
    targetType: Constructor<T>,
  ): void {
    const prototype = targetType.prototype;
    const missingFields: string[] = [];

    Object.getOwnPropertyNames(prototype).forEach(key => {
      const metadata = getMappingMetadata(prototype, key);
      if (
        metadata?.required &&
        (!(key in source) || (source as Record<string, any>)[key] === undefined)
      ) {
        missingFields.push(key);
      }
    });

    if (missingFields.length > 0) {
      const errorMessage = `Campos requeridos faltantes: ${missingFields.join(', ')}`;
      console.log(errorMessage); // Para verificar el mensaje exacto
      throw new BadRequestException(errorMessage);
    }
  }
}
