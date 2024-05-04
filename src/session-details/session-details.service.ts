import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departments, Designations, TeamLeads } from './entities/session-detail.entity';
import { IMaster } from 'src/core/variables/interface';

@Injectable()
export class SessionDetailsService {
  constructor(
    @InjectRepository(Departments)
    private departmentsRepo: Repository<Departments>,

    @InjectRepository(TeamLeads)
    private teamLeadsRepo: Repository<TeamLeads>,

    @InjectRepository(Designations)
    private designationsRepo: Repository<Designations>,
    
  ) {}

  async getMasterData() {
    const query1 =  this.departmentsRepo.createQueryBuilder('dept')
    .select(`dept.id as id, dept.name as name`)
    const query2 =  this.teamLeadsRepo.createQueryBuilder('tl')
    .select(`tl.id as id, tl.name as name`)
    const query3 =  this.designationsRepo.createQueryBuilder('des')
    .select(`des.id as id, des.name as name`)
    const[departmentDetails, teamLeadsDetails, designationDetails] = await Promise.all([
      query1.getRawMany<IMaster>(),
      query2.getRawMany<IMaster>(),
      query3.getRawMany<IMaster>()
    ])
    return {
      departmentDetails: departmentDetails,
      teamLeadsDetails: teamLeadsDetails,
      designationDetails: designationDetails
    }

  }
}
