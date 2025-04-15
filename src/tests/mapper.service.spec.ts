import { MapperService } from '../lib/mapper.service';
import { BadRequestException } from '@nestjs/common';

class SourceDTO {
  name: string;
  age: number;
}

class TargetDTO {
  name: string;
  age: number;
}

describe('MapperService', () => {
  let mapperService: MapperService;

  beforeEach(() => {
    mapperService = new MapperService();
  });

  it('should map an object from SourceDTO to TargetDTO', () => {
    const source: SourceDTO = { name: 'John', age: 30 };
    const result = mapperService.map(source, TargetDTO);
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('should map an array of objects from SourceDTO to TargetDTO', () => {
    const sources: SourceDTO[] = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ];
    const result = mapperService.mapArray(sources, TargetDTO);
    expect(result).toEqual([
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ]);
  });

  it('should map with strict validation and throw error when required field is missing', () => {
    class StrictSourceDTO {
      name: string;
    }

    class StrictTargetDTO {
      name: string;
      age: number;
    }

    const source: StrictSourceDTO = { name: 'John' };
    try {
      mapperService.map(source, StrictTargetDTO, { strictMapping: true });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Campos requeridos faltantes: age');
    }
  });

  it('should not throw error with strict validation if all required fields are present', () => {
    class StrictSourceDTO {
      name: string;
      age: number;
    }

    class StrictTargetDTO {
      name: string;
      age: number;
    }

    const source: StrictSourceDTO = { name: 'John', age: 30 };
    const result = mapperService.map(source, StrictTargetDTO, { strictMapping: true });
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('should map with non-strict validation and not throw error for missing fields', () => {
    class NonStrictSourceDTO {
      name: string;
    }

    class NonStrictTargetDTO {
      name: string;
      age: number;
    }

    const source: NonStrictSourceDTO = { name: 'John' };
    const result = mapperService.map(source, NonStrictTargetDTO, { strictMapping: false });
    expect(result).toEqual({ name: 'John', age: undefined });
  });

  it('should map nested objects correctly', () => {
    class SourceDTO {
      name: string;
      address: { city: string; country: string };
    }

    class TargetDTO {
      name: string;
      address: { city: string; country: string };
    }

    const source: SourceDTO = {
      name: 'John',
      address: { city: 'Montevideo', country: 'Uruguay' },
    };
    const result = mapperService.map(source, TargetDTO);
    expect(result).toEqual({
      name: 'John',
      address: { city: 'Montevideo', country: 'Uruguay' },
    });
  });

  it('should map array of nested objects correctly', () => {
    class SourceDTO {
      name: string;
      address: { city: string; country: string };
    }

    class TargetDTO {
      name: string;
      address: { city: string; country: string };
    }

    const sources: SourceDTO[] = [
      {
        name: 'John',
        address: { city: 'Montevideo', country: 'Uruguay' },
      },
      {
        name: 'Jane',
        address: { city: 'Buenos Aires', country: 'Argentina' },
      },
    ];

    const result = mapperService.mapArray(sources, TargetDTO);
    expect(result).toEqual([
      {
        name: 'John',
        address: { city: 'Montevideo', country: 'Uruguay' },
      },
      {
        name: 'Jane',
        address: { city: 'Buenos Aires', country: 'Argentina' },
      },
    ]);
  });
});
