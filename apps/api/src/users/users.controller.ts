import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetUserParamDTO } from './dto/requests/GetUserParamDTO.js';
import { GetUserUseCase } from './usecases/GetUserUseCase.js';
import { UpdateUserBodyDTO } from './dto/requests/UpdateUserBodyDTO.js';
import { UpdateUserUseCase } from './usecases/UpdateUserUseCase.js';
import { CreateUserBodyDTO } from './dto/requests/CreateUserBodyDTO.js';
import { CreateUserUseCase } from './usecases/CreateUserUseCase.js';
import { ListAllUsersUseCase } from './usecases/ListAllUsersUseCase.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListAllUsersUseCase,
  ) {}

  @Post()
  createUser(@Body() { name, email, password }: CreateUserBodyDTO) {
    return this.createUserUseCase.execute({ name, email, password });
  }

  @Get()
  getAllUsers() {
    return this.listUsersUseCase.execute();
  }

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
