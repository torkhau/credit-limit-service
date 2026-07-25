import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards';

@Controller('capacity')
@UseGuards(AuthGuard)
export class CapacityController {
  @Get()
  getCapacity() {
    return 'Capacity data';
  }

  @Post('reserve')
  reserveCapacity() {
    return 'Capacity reserved';
  }

  @Post('release')
  releaseCapacity() {
    return 'Capacity released';
  }
}
