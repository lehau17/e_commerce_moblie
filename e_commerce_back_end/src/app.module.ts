import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { SpuModule } from './spu/spu.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ShippingAddressesModule } from './shipping_addresses/shipping_addresses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';
import { PaymentMethodsModule } from './payment_methods/payment_methods.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ShopModule,
    SpuModule,
    CartsModule,
    CartItemsModule,
    ShippingAddressesModule,
    ReviewsModule,
    CommentsModule,
    PaymentMethodsModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
