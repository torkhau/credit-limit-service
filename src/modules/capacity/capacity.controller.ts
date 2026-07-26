import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards';
import { CapacityService } from './capacity.service';
import type { AuthenticationRequest } from '../../common/types';

@Controller('capacity')
@UseGuards(AuthGuard)
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Get()
  getCapacity(@Req() req: AuthenticationRequest) {
    return this.capacityService.accountCapacity(req.userId);
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
