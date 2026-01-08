import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, MaxLength } from "class-validator";

export class CreateSampleDto {
	@ApiProperty()
	@IsString()
	@MaxLength(100)
	name: string;

	@ApiProperty()
	@IsNumber()
	@Max(150)
	age: number;
}
