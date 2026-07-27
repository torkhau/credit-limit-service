import { Module } from '@nestjs/common';
import { CapacityController } from './capacity.controller';
import { CapacityService } from './capacity.service';
import { CapacityKafkaController } from './capacityKafka.controller';

@Module({
  controllers: [CapacityController, CapacityKafkaController],
  providers: [CapacityService],
})
export class CapacityModule {}
