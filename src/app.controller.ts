import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Controller, Get, HttpStatus, Res} from "@nestjs/common";
import {AppService} from "./app.service";

@ApiTags('Test')
@Controller('api/v1/test')
export class AppController {
  constructor(readonly appService: AppService
      ) {}
  @Get('hello')
  @ApiOperation({ summary: 'Testing hello World text' })
  async checkAdmin(@Res() res) {
    return res.status(HttpStatus.CREATED).send({
      statusCode: HttpStatus.FOUND,
      message: this.appService.getHello(),
    });
  }
}
