import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request,HttpCode,HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK) 
  @Get('/campaigns')
  findAllCampaigns(@Request() req) {
    return this.userService.getAllCampaigns(req.user.userId)
  }

    @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK) 
  @Get('/donations')
 getAllDonations(@Request() req) {
    return this.userService.getAllDonations(req.user.userId)
  }


  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK) 
  @Get('/stats')
  findUserStats(@Request() req) {
    return this.userService.fetchUserStats(req.user.userId)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK) 
  @Get('/admin-stats')
  findAdminStats() {
    return this.userService.fetchAdminStats()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id)
  }


  @UseGuards(AuthGuard)
  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  updateByAdmin(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
