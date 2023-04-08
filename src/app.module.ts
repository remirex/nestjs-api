import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './auth/constants';
import { RBAC_POLICY } from './auth/policy/rbac';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AccessTokenGuard } from './common/guards';
import databseConfig from './prisma/constants';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, databseConfig],
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
