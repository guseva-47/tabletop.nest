import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ITabletop } from './dto/tabletop.interface';
import { IUsr } from './dto/user.interface'
import { Tabletop } from './entity/tabletop.entity';
import { TabletopService } from './tabletop.service';

@Controller('table')
export class TabletopController {
  constructor(
    private readonly tableService: TabletopService,
  ) {}

  @Get()
  list(): Promise<Tabletop[]> {
    return this.tableService.getAllTabletop()
  }

  @Get(':id')
  getOne(@Param('id') tableId: number): Promise<ITabletop> {
    return this.tableService.getOne(tableId);
  }

  @Post()
  create(@Body() table: ITabletop): Promise<ITabletop> {
    return this.tableService.create(table);
  }

  @Put(':id')
  update(@Param('id') tableId: number, @Body() newTable: ITabletop): Promise<ITabletop> {
    return this.tableService.update(tableId, newTable);
  }

  @Delete(':id')
  delete(@Param('id') tableId: number) {
    this.tableService.delete(tableId);
  }

  @Put(':id/sub')
  subscribe(@Param('id') tableId: number, @Body() users: IUsr[]) {
    this.tableService.subscribeUsers(tableId, users);
    return this.tableService.getSubscribersAndNotsub(tableId);
  }

  @Get(':id/sub')
  getSubscribers(@Param('id') tableId: number) {
    return this.tableService.getSubscribers(tableId);
  }

  @Put(':id/unsub')
  unsubscribe(@Param('id') tableId: number, @Body() users: IUsr[]) {
    this.tableService.unSubscribeUsers(tableId, users);
    return this.tableService.getSubscribersAndNotsub(tableId);    
  }

  @Get(':id/unsub')
  getUnSubscribers(@Param('id') tableId: number) {
    return this.tableService.getAllUnSubscribers(tableId);
  }

}
