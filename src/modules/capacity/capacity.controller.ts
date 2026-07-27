import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards';
import type { AuthenticationRequest } from '../../common/types';
import { CapacityService } from './capacity.service';
import { ReleaseParamsDto } from './dto/release.dto';
import { ReserveDto } from './dto/reserve.dto';

@Controller('capacity')
@UseGuards(AuthGuard)
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Get()
  getCapacity(@Req() req: AuthenticationRequest) {
    return this.capacityService.accountCapacity(req.userId);
  }

  @Post('reserve')
  async reserveCapacity(
    @Req() req: AuthenticationRequest,
    @Body() body: ReserveDto,
  ) {
    await this.capacityService.addReservation(req.userId, body);
  }

  @Post('release/:reservationId')
  @HttpCode(204)
  async releaseCapacity(
    @Req() req: AuthenticationRequest,
    @Param() { reservationId }: ReleaseParamsDto,
  ) {
    await this.capacityService.releaseReservation(req.userId, reservationId);
  }
}
