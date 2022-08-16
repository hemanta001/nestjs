import {HttpModule, HttpService, Module} from '@nestjs/common';
import { DrugSavingService } from './drug-saving.service';
import {DrugSavingController} from "./drug-saving.controller";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [DrugSavingService],
  controllers: [DrugSavingController],
})
export class DrugSavingModule {}
