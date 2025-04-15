import 'reflect-metadata';

export const MAPPING_METADATA_KEY = 'custom:mapping';

export interface MappingMetadata {
  sourceKey?: string;
  transform?: (value: any) => any;
  ignore?: boolean;
  required?: boolean;
}

/**
 * Decorador para mapear una propiedad desde una clave de origen diferente
 * @param sourceKey Clave de origen para el mapeo
 */
export function MapFrom(sourceKey: string) {
  return Reflect.metadata(MAPPING_METADATA_KEY, { sourceKey });
}

/**
 * Decorador para transformar el valor durante el mapeo
 * @param transformFn Función de transformación
 */
export function Transform(transformFn: (value: any) => any) {
  return Reflect.metadata(MAPPING_METADATA_KEY, { transform: transformFn });
}

/**
 * Decorador para ignorar una propiedad durante el mapeo
 */
export function Ignore() {
  return Reflect.metadata(MAPPING_METADATA_KEY, { ignore: true });
}

/**
 * Decorador para marcar una propiedad como obligatoria durante el mapeo
 */
export function Required() {
  return Reflect.metadata(MAPPING_METADATA_KEY, { required: true });
}

/**
 * Obtiene los metadatos de mapeo de una propiedad
 * @param target Objeto objetivo
 * @param propertyKey Clave de la propiedad
 */
export function getMappingMetadata(
  target: any,
  propertyKey: string,
): MappingMetadata {
  return Reflect.getMetadata(MAPPING_METADATA_KEY, target, propertyKey) || {};
}
