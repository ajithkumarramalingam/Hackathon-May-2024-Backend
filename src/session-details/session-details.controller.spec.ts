import { Test, TestingModule } from '@nestjs/testing';
import { SessionDetailsController } from './session-details.controller';
import { SessionDetailsService } from './session-details.service';

describe('SessionDetailsController', () => {
  let controller: SessionDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionDetailsController],
      providers: [SessionDetailsService],
    }).compile();

    controller = module.get<SessionDetailsController>(SessionDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
