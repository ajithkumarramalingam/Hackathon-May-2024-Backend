import { Module } from '@nestjs/common';
import { SessionDetailsService } from './session-details.service';
import { SessionDetailsController } from './session-details.controller';
import { ApprovalTypes, Departments, Designations, Roles, SessionDetails, SessionDetailsMapping, TeamLeads, Users } from './entities/session-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilService } from 'src/core/utils/util/util.service';

@Module({
  controllers: [SessionDetailsController],
  providers: [SessionDetailsService, UtilService],
  imports: [
    TypeOrmModule.forFeature([
      Roles,
      TeamLeads,
      Departments,
      Designations,
      ApprovalTypes,
      Users,
      SessionDetails,
      SessionDetailsMapping
    ])
  ]
})
export class SessionDetailsModule {}
