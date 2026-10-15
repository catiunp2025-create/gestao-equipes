import { IsUUID } from "class-validator";

export class GetUserParamDTO {
  @IsUUID()
  id!: string;
}