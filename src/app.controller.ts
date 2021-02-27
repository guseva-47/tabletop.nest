import { Controller, Get } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { AppService } from "./app.service";
import Usr from "./tabletop/entity/user.entity";

@Controller()
export class AppController {
  private userRepo: Repository<Usr>;
  constructor(
    private readonly appService: AppService,
    private connection: Connection
    ){
      this.userRepo = connection.getRepository(Usr);
    }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  findAll(): Promise<Usr[]> {
    return this.userRepo.find();
  }
}
