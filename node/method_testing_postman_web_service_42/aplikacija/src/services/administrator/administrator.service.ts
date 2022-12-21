import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'misc/api.response.class';
import { ArgumentOutOfRangeError } from 'rxjs';
import { AdministratorController } from 'src/controllers/api/administrator.controller';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { Repository } from 'typeorm';
import { PlainObjectToNewEntityTransformer } from 'typeorm/query-builder/transformer/PlainObjectToNewEntityTransformer';
import { Administrator } from '../../../entities/administrator.entity';


@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly  administrator: Repository<Administrator>
    )  { }

   getAll(): Promise<Administrator[]> {
     return this.administrator.find();

   }

   getById(id: any): Promise<Administrator> {
          return this.administrator.findOneById(id);
      }
   
  add(data: AddAdministratorDto): Promise<Administrator> | ApiResponse {
      const crypto = require('crypto');

      const passwordHash = crypto.createHash('sha512');
      passwordHash.update(data.password);

      const passwordHashString = passwordHash.digest('hex').toUpperCase();

      let newAdmin: Administrator = new Administrator();
      newAdmin.username = data.username;
      newAdmin.passwordHash = passwordHashString;

      return new Promise((resolve) => {
        this.administrator.save(newAdmin)
        .then(data => resolve(data))
        .catch(error => {
        const response: any = new ApiResponse("error", -1001);
            resolve(response);

        });
        
      }); 
  }

      async editById(id: any, data: EditAdministratorDto): Promise<Administrator> {
        let admin: Administrator = await this.administrator.findOneById(id);

        const crypto = require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

          admin.passwordHash = passwordHashString;

          return this.administrator.save(admin);
      }

    }
  

