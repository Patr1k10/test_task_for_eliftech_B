import { Logger, Module } from '@nestjs/common';

import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { DrugsModule } from './drugs/drugs.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    DatabaseModule,
    ShopModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
    }),
    DrugsModule,
    CartModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
