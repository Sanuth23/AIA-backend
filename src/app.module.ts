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
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email/email.service';
import { AdminService } from './auth/admin.service';
import { JwtService } from '@nestjs/jwt';

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
    // MailerModule.forRoot({
    //   transport: {
    //     // host: 'smtp.gmail.com',
    //     // port: 587, // Use 587 for TLS, 465 for SSL
    //     // secure: false, // TLS is preferred for Gmail, so keep this false for port 587
    //     host: 'smtp.mailtrap.io',
    //     port: 2525,
    //     auth: {
    //       user: process.env.MAIL_USER,
    //       pass: process.env.MAIL_PASSWORD,
    //     },
    //     // tls: {
    //     //   ciphers: 'SSLv3',
    //     // },
    //   },
    //   defaults: {
    //     from: '"AIA Contact Us Form" <sanuth0000@gmail.com>',
    //   },
    // }),    
    MailerModule.forRoot({
      transport: {
        service: 'gmail', // Use Gmail service
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USER, // Gmail email address
          clientId: process.env.OAUTH_CLIENT_ID, // OAuth2 Client ID
          clientSecret: process.env.OAUTH_CLIENT_SECRET, // OAuth2 Client Secret
          refreshToken: process.env.OAUTH_REFRESH_TOKEN, // OAuth2 Refresh Token
          accessToken: process.env.OAUTH_ACCESS_TOKEN, // Optional, auto-generated if using refresh token
        },
      },
      defaults: {
        from: '"Your Service Name" <eudaimonia.aia@gmail.com>', // Default "from" email address
      },
    }),
    ActivityModule, UpcomingEventModule, EventRegistrationModule,
    TeamMemberModule, BlogModule, ProductCategoryModule,
    ProductModule, ContactUsModule, MemberReferenceModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedersService, EmailService],
})
export class AppModule { }
