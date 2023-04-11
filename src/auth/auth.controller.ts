import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RefreshTokenGuard } from 'src/common/guards';
import { UserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Signup new user' })
  @ApiCreatedResponse({
    description: 'Created succesfully',
    status: HttpStatus.CREATED,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiForbiddenResponse({
    description: 'Credentials taken',
    status: HttpStatus.BAD_REQUEST,
  })
  signup(@Body() dto: AuthDto): Promise<UserDto> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Signin user' })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiForbiddenResponse({
    description: 'Credentials incorrect',
    status: HttpStatus.FORBIDDEN,
  })
  signin(
    @Body()
    dto: AuthDto,
  ): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  logout(@GetCurrentUser('sub') userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard, ACGuard)
  @UseRoles({
    resource: 'refreshToken',
    action: 'update',
    possession: 'own',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
