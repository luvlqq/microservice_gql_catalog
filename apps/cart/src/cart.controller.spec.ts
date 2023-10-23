import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let cartController: CartController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    cartController = app.get<CartController>(CartController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cartController.getHello()).toBe('Hello World!');
    });
  });
});
