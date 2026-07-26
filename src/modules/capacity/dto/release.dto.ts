import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ReleaseParamsDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  reservationId!: string;
}
