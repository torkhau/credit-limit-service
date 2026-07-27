import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CapacityService } from './capacity.service';
import { CapacityKafkaDto } from './dto/capacityKafka.dto';

@Controller()
export class CapacityKafkaController {
  constructor(private readonly capacityService: CapacityService) {}

  @EventPattern('totalCapacity-reconciliation')
  async handleTotalCapacityReconciliation(
    @Payload() { totalCapacity }: CapacityKafkaDto,
  ) {
    await this.capacityService.updateTotalCapacity(totalCapacity);
  }
}
