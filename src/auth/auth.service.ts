import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth.user.dto';
import { JwtPayload } from './jwt-payload';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authUserDto: AuthUserDto): Promise<void> {
    await this.userRepository.signUp(authUserDto); 
  }

  async signIn(authUserDto: AuthUserDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authUserDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
