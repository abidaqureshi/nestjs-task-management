import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<void> {
    return this.authService.signUp(authUserDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authUserDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
