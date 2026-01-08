import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { SampleService } from "./sample.service";
import { CreateSampleDto, UpdateSampleDto } from "./dto";
import { BaseApiResponse, PaginationDto, SwaggerBaseApiResponse } from "@utils";
import { Builder } from "builder-pattern";

@Controller("sample")
export class SampleController {
	constructor(private readonly sampleService: SampleService) {}

	@Post()
	@SwaggerBaseApiResponse(String)
	async create(@Body() createSampleDto: CreateSampleDto) {
		const data = this.sampleService.create(createSampleDto);
		return BaseApiResponse.success(data);
	}

	@Get()
	@SwaggerBaseApiResponse(String, { withPagination: true })
	async findAll() {
		const data = this.sampleService.findAll();
		const pagination = Builder(PaginationDto)
			.page(1)
			.take(10)
			.totalRecord(100)
			.totalPage(10)
			.nextPage(2)
			.prevPage(undefined)
			.build();

		return BaseApiResponse.success(data, pagination);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.sampleService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateSampleDto: UpdateSampleDto) {
		return this.sampleService.update(+id, updateSampleDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.sampleService.remove(+id);
	}
}
