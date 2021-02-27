import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TabletopModule } from './tabletop/tabletop.module';

// .forRootAsync({
//   useFactory: async () =>
//     Object.assign(await getConnectionOptions(), {
//       autoLoadEntities: true,
//     })
//   }),

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TabletopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
