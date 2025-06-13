
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { SignUp } from './dto/sign-up';
import { hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';

type User = any;


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService,private emailService:EmailService) {}

  async findAll(): Promise<User[] | undefined> {
    return this.prisma.user.findMany({
      include:{
        role:true,
      }
    })
  }


  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({where:{email},include:{role:true}})
  }

  async create(data:CreateUserDto): Promise<User | undefined> {

    // let password = await hash(data.password,10)


    return this.prisma.user.create({data})

  }

  async getAllCampaigns(id:string) {
    return this.prisma.user.findFirst({where:{id},include:{campaigns:true}});
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
