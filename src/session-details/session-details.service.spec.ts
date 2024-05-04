import { Test, TestingModule } from '@nestjs/testing';
import { SessionDetailsService } from './session-details.service';

describe('SessionDetailsService', () => {
  let service: SessionDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionDetailsService],
    }).compile();

    service = module.get<SessionDetailsService>(SessionDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
