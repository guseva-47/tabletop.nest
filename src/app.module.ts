import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TabletopModule } from './tabletop/tabletop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TabletopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
