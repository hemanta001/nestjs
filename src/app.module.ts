import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugSavingModule } from './drugsaving/drug-saving.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DrugSavingModule
  ],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor],
})
export class AppModule {}
