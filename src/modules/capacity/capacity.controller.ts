import { Controller, Get, Post } from '@nestjs/common';

@Controller('capacity')
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
