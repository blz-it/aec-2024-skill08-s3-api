import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        host: configService.get('DB_HOST'),
        dbName: 'postgres',
        user: 'postgres',
        password: 'postgres',
        driver: PostgreSqlDriver,
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static/',
    }),
    UsersModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private orm: MikroORM) {}

  async onApplicationBootstrap() {
    const generator = this.orm.getSchemaGenerator();
    await generator.updateSchema();
  }
}
