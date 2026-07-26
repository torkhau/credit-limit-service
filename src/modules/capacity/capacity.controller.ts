import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards';
import { CapacityService } from './capacity.service';

@Controller('capacity')
@UseGuards(AuthGuard)
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Get()
  getCapacity() {
    return this.capacityService.accountCapacity();
  }

  @Post('reserve')
  reserveCapacity() {
    return this.capacityService.addReservation({
      amount: 10,
      currency: 'USD',
    });
  }

  @Post('release')
  releaseCapacity() {
    return this.capacityService.releaseReservation('1');
  }
}
