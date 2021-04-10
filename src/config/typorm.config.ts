import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as config from 'config';

const databaseConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: databaseConfig.type, //
  host: process.env.RDS_HOSTNAME || databaseConfig.host, //
  port: process.env.RDS_PORT || databaseConfig.port,
  username: process.env.RDS_USERNAME || databaseConfig.username, //
  password: process.env.RDS_PASSWORD || databaseConfig.password, //
  database: process.env.RDS_DATABASE || databaseConfig.database, //
  entities: [join(__dirname, '../', '**', '*.entity.{js,ts}')],
  synchronize: databaseConfig.synchronize,
};
