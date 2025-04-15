import { Module } from '@nestjs/common';
import { MapperModule } from '../lib/mapper.module';
import { ExampleController } from './controller/example.controller';
import { ExampleService } from './example.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [MapperModule],
  controllers: [ExampleController],
  providers: [ExampleService, UserRepository],
})
export class ExampleModule {}