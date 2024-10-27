import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateActivityDto } from 'src/activity/dto/create-activity.dto';
import { Activity } from '../activity/entities/activity.entity';
import { DataSource } from 'typeorm';
import { Blog } from '../blog/entities/blog.entity';
import { CreateBlogDto } from '../blog/dto/create-blog.dto';
import { BlogImage } from '../blog/entities/blog-image.entity';
import { CreateBlogImageDto } from '../blog/dto/create-blog-image.dto';
import { ContactUs } from '../contact-us/entities/contact-us.entity';
import { CreateContactUsDto } from '../contact-us/dto/create-contact-us.dto';
import { EventRegistration } from '../event-registration/entities/event-registration.entity';
import { CreateEventRegistrationDto } from '../event-registration/dto/create-event-registration.dto';
import { MemberReference } from '../member-reference/entities/member-reference.entity';
import { CreateMemberReferenceDto } from '../member-reference/dto/create-member-reference.dto';
import { Product } from '../product/entities/product.entity';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { CreateProductImageDto } from '../product/dto/create-product-image.dto';
import { ProductImage } from '../product/entities/product-image.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { CreateProductCategoryDto } from '../product-category/dto/create-product-category.dto';
import { TeamMember } from '../team-member/entities/team-member.entity';
import { CreateTeamMemberDto } from '../team-member/dto/create-team-member.dto';
import { UpcomingEvent } from '../upcoming-event/entities/upcoming-event.entity';
import { CreateUpcomingEventDto } from '../upcoming-event/dto/create-upcoming-event.dto';

@Injectable()
export class SeedersService {
    queryRunner: any;

	constructor(
		@InjectDataSource()
		private readonly dataSource: DataSource,
	) {
		this.queryRunner = this.dataSource.createQueryRunner();
	}

    async runInitialSeeds() {
		await this.seedActivities();
		await this.seedBlogs();
		await this.seedContactUs();
		await this.seedProductCategories();
		await this.seedTeamMembers();
		await this.seedUpcomingEvents();
		await this.seedEventRegistrations();
		await this.seedMemberReferences();
		await this.seedProductCategories();
	
    }

    async seedActivities(){
        const activities: CreateActivityDto[] = [
            {
                topic: "Community Clean-Up",
                description: "Join us for a community clean-up event.",
                imagePath: "/images/cleanup.jpg",
                createdBy: 1,
                createdAt: new Date('2024-08-10'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
            {
                topic: "Tech Workshop",
                description: "A workshop on the latest in tech.",
                imagePath: "/images/techworkshop.jpg",
                createdBy: 2,
                createdAt: new Date('2024-08-15'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
        ];

        await this.queryRunner.manager.save(Activity, activities);
    }

    async seedBlogs() {
        const blogs = [
            {
                topic: "The Future of AI",
                description: "Exploring the potential of AI in various industries.",
                adminId: 3,
                createdBy: 1,
                createdAt: new Date('2024-08-12'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                blogImages: [
                    {
                        path: "/images/ai-future.jpg",
                    }
                ]
            },
            {
                topic: "Healthy Living Tips",
                description: "Tips and tricks for a healthier lifestyle.",
                adminId: 4,
                createdBy: 2,
                createdAt: new Date('2024-08-17'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                blogImages: []
            },
        ];
    
        await this.queryRunner.manager.save(Blog, blogs);
    }

    // async seedBlogImages() {
    //     const blogImages: CreateBlogImageDto[] = [
    //         {
    //             path: "/images/ai-future.jpg",
    //             blogId: 1,
    //         },
    //         {
    //             path: "/images/healthy-living.jpg",
    //             blogId: 2,
    //         },
    //     ];
    
    //     await this.queryRunner.manager.save(BlogImage, blogImages);
    // }
    
    async seedContactUs() {
        const contactUs: CreateContactUsDto[] = [
            {
                name: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "123-456-7890",
                description: "Inquiry about upcoming events.",
                createdBy: 1,
                createdAt: new Date('2024-08-18'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
            {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phoneNumber: "098-765-4321",
                description: "Interested in volunteering.",
                createdBy: 2,
                createdAt: new Date('2024-08-19'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
        ];
    
        await this.queryRunner.manager.save(ContactUs, contactUs);
    }
    
    async seedEventRegistrations() {
        const eventRegistrations: CreateEventRegistrationDto[] = [
            {
                name: "Alice Brown",
                email: "alice.brown@example.com",
                phoneNumber: "123-123-1234",
                age: 25,
                address: "123 Main St, Anytown, USA",
                gender: "Female",
                upcomingEventId: 1,
                createdBy: 1,
                createdAt: new Date('2024-08-20'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
            {
                name: "Bob Johnson",
                email: "bob.johnson@example.com",
                phoneNumber: "321-321-4321",
                age: 30,
                address: "456 Elm St, Othertown, USA",
                gender: "Male",
                upcomingEventId: 2,
                createdBy: 2,
                createdAt: new Date('2024-08-21'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
        ];
    
        await this.queryRunner.manager.save(EventRegistration, eventRegistrations);
    }

    async seedMemberReferences() {
        const memberReferences: CreateMemberReferenceDto[] = [
            {
                name: "Charlie Green",
                email: "charlie.green@example.com",
                phoneNumber: "234-234-2345",
                description: "Reference for team member and product category.",
                teamMemberId: 1,
                productCategoryId: 1,
                createdBy: 1,
                createdAt: new Date('2024-08-22'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
            {
                name: "Diana White",
                email: "diana.white@example.com",
                phoneNumber: "432-432-5432",
                description: "Reference for another team member.",
                teamMemberId: 2,
                productCategoryId: 2,
                createdBy: 2,
                createdAt: new Date('2024-08-23'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
            },
        ];
    
        await this.queryRunner.manager.save(MemberReference, memberReferences);
    }
    
    async seedProducts() {
        const products : CreateProductDto[] = [
            {
                mainTitle: "Super Widget",
                topic: "topic 1",
                coverAge: "80",
                issueAge: "30-60",
                description: "A highly advanced widget.",
                categoryId: 1,
                createdBy: 1,
                createdAt: new Date('2024-10-24'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                productImages: [
                    {
                        path: "/images/super-widget.jpg",
                        productId: 1
                    }
                ]
            },
            {
                mainTitle: "Super Gadget",
                topic: "topic 2",
                coverAge: "70",
                issueAge: "20-55",
                description: "A gadget with extra features.",
                categoryId: 2,
                createdBy: 2,
                createdAt: new Date('2024-10-25'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                productImages: []
            },
        ];
    
        await this.queryRunner.manager.save(Product, products);
    }
    
    // async seedProductImages() {
    //     const productImages: CreateProductImageDto[] = [
    //         {
    //             path: "/images/super-widget.jpg",
    //             productId: 1,
    //         },
    //         {
    //             path: "/images/mega-gadget.jpg",
    //             productId: 2,
    //         },
    //     ];
    
    //     await this.queryRunner.manager.save(ProductImage, productImages);
    // }
    
    async seedProductCategories() {
        const productCategories: CreateProductCategoryDto[] = [
            {
                name: "Electronics",
                description: "Category for electronic products.",
                createdBy: 1,
                createdAt: new Date('2024-08-26'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                products: [],
                memberReferences: []
            },
            {
                name: "Home Appliances",
                description: "Category for home appliances.",
                createdBy: 2,
                createdAt: new Date('2024-08-27'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                products: [],
                memberReferences: []
            },
        ];
    
        await this.queryRunner.manager.save(ProductCategory, productCategories);
    }
    
    async seedTeamMembers() {
        const teamMembers: CreateTeamMemberDto[] = [
            {
                name: "Emily Clark",
                imagePath: "/images/emily.jpg",
                description: "Lead developer with 10 years of experience.",
                link1: "https://linkedin.com/emilyclark",
                link2: "https://github.com/emilyclark",
                link3: "https://twitter.com/emilyclark",
                createdBy: 1,
                createdAt: new Date('2024-08-28'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                memberReferences: []
            },
            {
                name: "Frank Miller",
                imagePath: "/images/frank.jpg",
                description: "Project manager with expertise in agile methodologies.",
                link1: "https://linkedin.com/frankmiller",
                link2: "https://github.com/frankmiller",
                link3: "https://twitter.com/frankmiller",
                createdBy: 2,
                createdAt: new Date('2024-08-29'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                memberReferences: []
            },
        ];
    
        await this.queryRunner.manager.save(TeamMember, teamMembers);
    }
    
    async seedUpcomingEvents() {
        const upcomingEvents: CreateUpcomingEventDto[] = [
            {
                topic: "Annual Tech Conference",
                date: new Date('2024-09-10'),
                location: "Convention Center",
                description: "A conference on emerging technologies.",
                createdBy: 1,
                createdAt: new Date('2024-08-30'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                eventRegistrations: []
            },
            {
                topic: "Charity Gala",
                date: new Date('2024-09-15'),
                location: "City Hall",
                description: "A gala event to raise funds for charity.",
                createdBy: 2,
                createdAt: new Date('2024-08-31'),
                updatedBy: null,
                deletedBy: null,
                updatedAt: null,
                deletedAt: null,
                eventRegistrations: []
            },
        ];
    
        await this.queryRunner.manager.save(UpcomingEvent, upcomingEvents);
    }
    
}
