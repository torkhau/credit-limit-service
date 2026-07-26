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
  reserveCapacity(@Req() req: AuthenticationRequest, @Body() body: ReserveDto) {
    this.capacityService.addReservation(req.userId, body);
  }

  @Post('release/:reservationId')
  @HttpCode(204)
  releaseCapacity(
    @Req() req: AuthenticationRequest,
    @Param() { reservationId }: ReleaseParamsDto,
  ) {
    this.capacityService.releaseReservation(req.userId, reservationId);
  }
}
