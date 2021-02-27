import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITabletop } from './dto/tabletop.interface';
import { IUsr } from './dto/user.interface';
import { Tabletop } from './entity/tabletop.entity';
import Usr from './entity/user.entity';

@Injectable()
export class TabletopService {
  constructor(
    @InjectRepository(Usr)
    private userRepo: Repository<Usr>,
    @InjectRepository(Tabletop)
    private tableRepo: Repository<Tabletop>,
  ) { }

  public async getAllTabletop(): Promise<ITabletop[]> {
    return this.tableRepo.find({relations: ['owner']});
  }

  public async getOne(tableId: number): Promise<ITabletop> {
    return this.tableRepo.findOne({where: {id: tableId}, relations: ['players', 'owner']});
  }

  public async create(table: ITabletop): Promise<ITabletop> {
    return this.tableRepo.save(table);
  }

  public async update(tableId: number, newTable: ITabletop): Promise<ITabletop> {
    await this.tableRepo.findOneOrFail({where: {id: tableId}, relations: ['players', 'owner']});
    return this.tableRepo.save({...newTable, id: tableId});
  }

  public async delete(tableId: number) {
    await this.tableRepo.findOneOrFail(tableId);
    this.tableRepo.delete(tableId);
  }

  public async getSubscribers(tableId: number): Promise<IUsr[]> {
    const table = await this.tableRepo.findOneOrFail({where: {id: tableId}, relations: ['players']});
    return table.players;
  }

  public async getAllUsers(): Promise<IUsr[]> {
    return this.userRepo.find();
  }

  public async subscribeUsers(tableId: number, users: IUsr[]): Promise<ITabletop> {
    const table = await this.tableRepo.findOneOrFail({where: {id: tableId}, relations: ['players', 'owner']});
    
    users.forEach(async (user) => {
      const userFromDB: IUsr = await this.userRepo.findOne(user);

      if (table.owner.id == userFromDB.id) return;
      if (table.players.some(elem => elem.id == userFromDB.id)) return;
      table.players.push(userFromDB);
    })
    return this.tableRepo.save(table);
  }

  public async getAllUnSubscribers(tableId: number, tableFromDb?: ITabletop): Promise<IUsr[]> {
    const table = tableFromDb? tableFromDb : await this.tableRepo.findOneOrFail({where: {id: tableId}, relations: ['players', 'owner']});
    const usersToDel = table.players;
    usersToDel.push(table.owner);

    const allUsers: IUsr[] = await this.getAllUsers();
    
    usersToDel.forEach( player => {
      const index = allUsers.findIndex(user => user.id == player.id);
      if (index == -1) return;
      allUsers.splice(index, 1);
    })

    return allUsers;
  }

  public async getSubscribersAndNotsub(tableId: number) {
    const table = await this.tableRepo.findOneOrFail({where: {id: tableId}, relations: ['players', 'owner']});
    
    const result = {
      subscribers: null,
      notsubscribers: null
    }
    result.subscribers = table.players;
    result.notsubscribers = await this.getAllUnSubscribers(tableId, table);

    return result;
  }

  public async unSubscribeUsers(tableId: number, users: IUsr[]): Promise<ITabletop> {
    const table = await this.tableRepo.findOneOrFail({where: {id: tableId}, relations: ['players', 'owner']});
    
    users.forEach(async (user) => {
      const userFromDB: IUsr = await this.userRepo.findOneOrFail(user);
      const index = table.players.findIndex(elem => elem.id == userFromDB.id)
      if (index != -1)
        table.players.slice(index, 1);
    })
    return this.tableRepo.save(table);
  }

}
