
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";


config();
const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER_NAME'),
  password: configService.get('DB_USER_PASSWORD'),
  database: configService.get('DB_NAME'),
  //logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  entities: [      
    'dist/**/entities/*.entity{.ts,.js}'    
  ],
  migrations: [  
    'dist/libs/backend/features/src/lib/database/migrations/*{.ts,.js}',
    
  ]
}

export const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
  .then(() => console.log("Data Source has been initialized"))
  .catch((error) => console.log("Error initializating Data Source", error))

