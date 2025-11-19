import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { SignUpDto } from "../../application/dto/signup.dto";
import { SignInDto } from "../../application/dto/signin.dto";
import { SignUpUseCase } from "../../application/use-cases/signup.use-case";
import { SignInUseCase } from "../../application/use-cases/signin.use-case";
import { GetUserUseCase } from "../../application/use-cases/get-user.use-case";
import { JwtAuthGuard } from "./jwt-auth.guard";
import type { RequestWithUser } from "./interfaces/request-with-user.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Post("signin")
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Request() req: RequestWithUser) {
    return this.getUserUseCase.execute(req.user.userId);
  }
}
