import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto, UpdateSampleDto } from './dto';
import { ApiResponseDto } from '@utils';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async create(@Body() createSampleDto: CreateSampleDto): Promise<ApiResponseDto> {
    return {
      data: this.sampleService.create(createSampleDto),
    };
  }

  @Get()
  async findAll(): Promise<ApiResponseDto> {
    return {
      data: this.sampleService.findAll(),
      pagination: {
        page: 1,
        take: 1,
        totalPage: 1,
        totalRecord: 2,
        nextPage: 2,
      }
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(+id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleService.remove(+id);
  }
}
