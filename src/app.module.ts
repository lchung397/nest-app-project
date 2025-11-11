import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST") || "136.110.37.70",
        port: parseInt(configService.get<string>("DB_PORT") || "5432"),
        username: configService.get<string>("DB_USERNAME") || "postgres",
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE") || "postgres",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
