import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
     type: 'mysql',
     host: DatabaseConfiguration.hostname,
     port: 3306,
     username: DatabaseConfiguration.username,
     password: DatabaseConfiguration.password,
     database: DatabaseConfiguration.database,
     entities: [ Administrator]
    }),
    TypeOrmModule.forFeature([ Administrator ])
  ],
  controllers: [
    AppController,
    AdministratorController,
  ],
  providers: [AppService, AdministratorService],
})
export class AppModule {}