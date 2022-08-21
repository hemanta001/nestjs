import {
  Controller,
  Get,
  HttpStatus, Headers, Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {DrugSavingService} from "./drug-saving.service";

@ApiTags('DrugSaving')
@ApiBearerAuth()
@Controller('api/v1/drug-savings')
export class DrugSavingController {
  constructor(private drugSavingService: DrugSavingService) {}


  @Get('/load/cached')
  @ApiOperation({ summary: 'List of load cached.' })
  async findAll(@Headers() headers, @Res() res) {
    const token=headers.get("Authorization");

    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      data: await this.drugSavingService.findCachedDrugs(token),
    });
  }

}
