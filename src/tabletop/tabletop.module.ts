import { Module } from '@nestjs/common';
import { TabletopService } from './tabletop.service';
import { TabletopController } from './tabletop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tabletop } from './entity/tabletop.entity';
import Usr from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tabletop, Usr])],
  providers: [TabletopService],
  controllers: [TabletopController]
})
export class TabletopModule {}
