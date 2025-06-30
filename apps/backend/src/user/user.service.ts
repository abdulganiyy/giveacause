
import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { SignUp } from './dto/sign-up';
import { hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { PaystackService } from 'src/paystack/paystack.service';

type User = any;


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService,private emailService:EmailService,private paystackService:PaystackService) {}

  async findAll() {

      const usersData = await  this.prisma.user.findMany({
      include:{role:true,campaigns:true,donations:true},      
      orderBy: { createdAt: 'asc' },
    })


  const users = usersData.map(user => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    avatar: user.avatarUrl,
    createdAt: user.createdAt.toISOString().split('T')[0],
    campaignsCreated:user.campaigns.length,
    totalRaised:user.campaigns.reduce((sum, c) => sum + c.currentAmount, 0),
    totalDonated:user.donations.reduce((sum, c) => sum + c.amount, 0),
    donationsMade:user.donations.length,
    status:user.status,
    paystackSubAccountId:user.paystackSubAccountId,
    role:user.role.name
  }))

  return users
    // return this.prisma.user.findMany({
    //   include:{
    //     role:true,
      
    //   }
    // })
  }


  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({where:{email},include:{role:true}})
  }

    async findUserById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({where:{id},include:{role:true}})
  }

  async create(data:CreateUserDto): Promise<User | undefined> {

    // let password = await hash(data.password,10)


    return this.prisma.user.create({data})

  }

  async getAllCampaigns(id:string) {
    return this.prisma.campaign.findMany({where:{creatorId:id},include:{donations:true,category:true}});
  }

  async getAllDonations(id:string) {
    return this.prisma.donation.findMany({where:{userId:id},include:{campaign:true,user:true}})
  }

  async fetchUserStats(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      campaigns: {
        select: {
          currentAmount: true,
        },
      },
      donations: {
        select: {
          amount: true,
        },
      },
    },
  });

  if (!user) throw new NotFoundException('User not found');

  const totalRaised = user.campaigns.reduce((sum, c) => sum + c.currentAmount, 0);
  const totalDonated = user.donations.reduce((sum, d) => sum + d.amount, 0);

  return {
    id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    avatar: user.avatarUrl || null,
    role: user.role.name,
    createdAt: user.createdAt.toISOString().split('T')[0],
    totalRaised,
    totalDonated,
    campaignsCreated: user.campaigns.length,
    donationsMade: user.donations.length,
    paystackSubaccount: user.paystackSubAccountId || null,
    profileComplete: user.status === "COMPLETED",
    status:user.status
  };
}

async fetchAdminStats() {
  // Fetch all users and campaigns
  const [usersData, campaignsData,categoriesData,donationsData, pendingCampaignsCount] = await this.prisma.$transaction([
    this.prisma.user.findMany({
      include:{role:true,campaigns:true,donations:true},      
      orderBy: { createdAt: 'asc' },
    }),
    this.prisma.campaign.findMany({
      select: {
        id: true,
        title: true,
        currentAmount: true,
        targetAmount: true,
        status: true,
        createdAt: true,
        imageUrl: true,
        featured: true,
        trending: true,
        creator:true,
        category:true,
        deadline:true,
        isActive:true,
        description:true,
        donations:true
      },

    }),
     this.prisma.category.findMany({
    include:{campaigns:true}
    }),
    this.prisma.donation.findMany(),
    this.prisma.campaign.count({
      where: { status: 'PENDING' }
    }),
  ]);

  // Compute platform-wide totals
  const totalRaised = campaignsData.reduce((sum, c) => sum + c.currentAmount, 0);
  const platformRevenue = donationsData.reduce((sum, d) => sum + (d as {tip:number}).tip, 0);


  // Optional logic to define flagged campaigns (example: currentAmount = 0 + not active)
  const flaggedCampaigns = campaignsData.filter(c => c.status == 'REJECTED');

  const recentUsers = usersData.slice(-5).map(user => ({
    id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    avatar: user.avatarUrl,
    createdAt: user.createdAt.toISOString().split('T')[0],
    campaignsCreated:user.campaigns.length,
    totalRaised:user.campaigns.reduce((sum, c) => sum + c.currentAmount, 0),
    totalDonated:user.donations.reduce((sum, c) => sum + c.amount, 0),
    donationsMade:user.donations.length,
    status:user.status,
    paystackSubAccountId:user.paystackSubAccountId,
    role:user.role.name
  }))

  const topCampaigns = [...campaignsData]
    .sort((a, b) => b.currentAmount - a.currentAmount)
    .slice(0, 10)
    .map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      raisedAmount: c.currentAmount,
      goalAmount: c.targetAmount,
      imageUrl: c.imageUrl,
      featured: c.featured,
      trending: c.trending,
      creator:c.creator,
      category:c.category,
      deadline:c.deadline,
      status:c.status,
      isActive:c.isActive,
      createdAt:c.createdAt,
      donorCount:c.donations.length
      
    }))

   const categories = categoriesData.map((c)=>({name:c.name,campaigns:c.campaigns.length}))

  return {
    totalUsers: usersData.length,
    totalCampaigns: campaignsData.length,
    totalRaised,
    platformRevenue,
    pendingCampaigns: pendingCampaignsCount,
    flaggedCampaigns: flaggedCampaigns.length,
    recentUsers,
    topCampaigns,
    categories
  }
}

  async update(id: string, updateUserDto: UpdateUserDto) {

    if(updateUserDto.accountNumber){
     const data = await this.paystackService.createSubAccount(updateUserDto.accountNumber,updateUserDto.bankName as string,updateUserDto.accountName as string);
     updateUserDto.paystackSubAccountId = data.subaccount_code;
    }

    return this.prisma.user.update({where:{id},data:updateUserDto})
  }



  async updatePassword(data:User): Promise<User | undefined> {

    return  this.prisma.user.update({
      where: { email:data.email },
      data: { password: data.password },
    });
  }

}


// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UserService {
//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all user`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
