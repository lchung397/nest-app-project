import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
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
      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: "postgres" as const,
          host: configService.get("DB_HOST") || "136.110.37.70",
          port: parseInt(configService.get("DB_PORT") || "5432"),
          username: configService.get("DB_USERNAME") || "postgres",
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE") || "postgres",
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: true,
          logging: true,
        };
        
        console.log("🔧 Database Configuration:");
        console.log(`  Host: ${dbConfig.host}`);
        console.log(`  Port: ${dbConfig.port}`);
        console.log(`  Database: ${dbConfig.database}`);
        console.log(`  Username: ${dbConfig.username}`);
        
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
