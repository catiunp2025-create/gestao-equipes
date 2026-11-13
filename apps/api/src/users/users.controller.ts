import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GetUserParamDTO } from './dto/requests/GetUserParamDTO.js';
import { GetUserUseCase } from './usecases/GetUserUseCase.js';
import { UpdateUserBodyDTO } from './dto/requests/UpdateUserBodyDTO.js';
import { UpdateUserUseCase } from './usecases/UpdateUserUseCase.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get(':id')
  getUserbyId(@Param() { id }: GetUserParamDTO) {
    return this.getUserUseCase.execute({ id });
  }

  @Patch(':id')
  updateUser(
    @Param() { id }: GetUserParamDTO,
    @Body() { name, email }: UpdateUserBodyDTO,
  ) {
    return this.updateUserUseCase.execute({ id, name, email });
  }
}
