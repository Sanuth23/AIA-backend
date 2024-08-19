import { NestFactory } from '@nestjs/core';
import { SeedersService } from './src/seeders/seeders.service';
import { AppModule } from './src/app.module';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedersService = app.get(SeedersService);

    try {
        await seedersService.seedActivities();
        await seedersService.seedBlogs();
        await seedersService.seedContactUs();
        await seedersService.seedProductCategories();
        await seedersService.seedTeamMembers();
        await seedersService.seedUpcomingEvents();
        await seedersService.seedEventRegistrations();
        await seedersService.seedMemberReferences();
        await seedersService.seedProducts();
        await app.close();

    } catch (error) {
        console.error(error);
        await app.close();
        process.exit(1);
    }
}

bootstrap();