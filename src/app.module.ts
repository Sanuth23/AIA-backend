import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ActivityModule } from './activity/activity.module';
import { UpcomingEventModule } from './upcoming-event/upcoming-event.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';
import { TeamMemberModule } from './team-member/team-member.module';
import { BlogModule } from './blog/blog.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { MemberReferenceModule } from './member-reference/member-reference.module';
import { SeedersService } from './seeders/seeders.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: configService.get('DB_AUTO_LOAD_ENTITIES') == 'true' ? true : false,
        synchronize: configService.get('DB_SYNCHRONIZE') == 'true' ? true : false,
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        migrations: ['dist/migration/*.js'],
      })
    }),
    ActivityModule, UpcomingEventModule, EventRegistrationModule,
    TeamMemberModule, BlogModule, ProductCategoryModule,
    ProductModule, ContactUsModule, MemberReferenceModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedersService],
})
export class AppModule { }
