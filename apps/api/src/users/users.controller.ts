import { Controller, Get, Param } from '@nestjs/common';
import { GetUserParamDTO } from './dto/requests/GetUserParamDTO.js';
import { GetUserUseCase } from './usecases/GetUserUseCase.js';

@Controller('users')
export class UsersController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get(':id')
  getUserbyId(@Param() { id }: GetUserParamDTO) {
    return this.getUserUseCase.execute({ id });
  }
}
