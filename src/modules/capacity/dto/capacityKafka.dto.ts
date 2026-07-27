import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CapacityKafkaDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalCapacity!: number;
}
