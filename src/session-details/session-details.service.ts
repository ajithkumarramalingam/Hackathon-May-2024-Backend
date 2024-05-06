import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalTypes, Departments, Designations, Roles, SessionDetails, SessionDetailsMapping, TeamLeads, Users } from './entities/session-detail.entity';
import { IAdminStatus, IAdminTiming, IMaster, ISearchData, ISessionDetails } from 'src/core/variables/interface';

@Injectable()
export class SessionDetailsService {
  constructor(
    @InjectRepository(Departments)
    private departmentsRepo: Repository<Departments>,

    @InjectRepository(TeamLeads)
    private teamLeadsRepo: Repository<TeamLeads>,

    @InjectRepository(Designations)
    private designationsRepo: Repository<Designations>,

    @InjectRepository(SessionDetails)
    private sessionDetailsRepo: Repository<SessionDetails>,
    
    @InjectRepository(SessionDetailsMapping)
    private sessionDetailsMappingRepo: Repository<SessionDetailsMapping>,

    @InjectRepository(Users)
    private usersRepo: Repository<Users>,

    @InjectRepository(ApprovalTypes)
    private approvalTypesRepo: Repository<ApprovalTypes>
    
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

  saveSessionDetails(data: ISessionDetails) {
    console.log('data===',data);
    return this.sessionDetailsRepo.save(data);
  }

  getSessionDetails(object: ISearchData) {
    const query = this.sessionDetailsRepo.createQueryBuilder('sd')
    .leftJoin(Departments, 'dept', 'dept.id = sd.departmentId')
    .leftJoin(Designations, 'des', 'des.id = sd.designationId')
    .leftJoin(TeamLeads, 'tl', 'tl.id = sd.leadId')
    .leftJoin(ApprovalTypes, 'at', 'at.id = sd.approvalId')
    .leftJoin(Users, 'u', 'u.id = sd.userId')
    .leftJoin(SessionDetailsMapping, 'sdm', 'sdm.sessionDetailsId = sd.id')
    .select(`
      sd.id as id,
      sd.topic as topic, 
      sd.takingHrs as takingHrs, 
      sd.date as date, 
      at.name as approvalStatus, 
      tl.name as teamLeadName, 
      dept.name as departmentName,
      sdm.fromTime as fromTime,
      sdm.toTime as toTime,
      des.name as designationName,
      sd.approvalId as approvalId,
      sd.leadId as leadId,
      sd.departmentId as departmentId,
      sd.designationId as designationId,
      sd.createdAt as requestedDate
      `)
    .where('sd.isActive = true AND DATE(sd.createdAt) =:date', { date: object.date })
    if (object.search) {
      query.andWhere(
        `(
            at.name LIKE :search or
            des.name LIKE :search or
            dept.name LIKE :search or
            DATE_FORMAT(sd.date, '%d-%m-%Y') LIKE :search
          )`,
        { search: `%${object.search}%` }
      );
    }
    return query.getRawMany();
  }

  saveAdminSessionDetails(adminStatus: IAdminStatus): Promise<SessionDetails> {
    return this.sessionDetailsRepo.save(adminStatus);
  }

  async saveAdminStatus(adminTiming: IAdminTiming) {
    await this.sessionDetailsMappingRepo.createQueryBuilder()
    .update()
    .set({ fromTime: adminTiming.fromTime, toTime: adminTiming.toTime })
    .where('sessionDetailsId =:sessionDetailsId', { sessionDetailsId: adminTiming.sessionDetailsId })
    .execute();
    // return await this.sessionDetailsMappingRepo.save(adminTiming);
  }

  getSessionExist(userId: number) {
    return this.sessionDetailsRepo.createQueryBuilder('sd')
    .where('DATE(sd.createdAt) = curdate() AND sd.userId = :userId', { userId })
    .getExists()
  }

  checkLoginCredential(loginData) {
    console.log('loginData',loginData);
    return this.usersRepo.createQueryBuilder('u')
    .select(`u.roleId as roleId`)
    .where('u.email =:email AND u.password =:password', { email: loginData.email, password: loginData.password})
    .getRawOne();
  }

  removeSession(id: number) {
    return this.sessionDetailsRepo.createQueryBuilder('sd')
    .update()
    .set({ isActive: false })
    .where('id =:id', { id })
    .execute();
  }

  getUserSessionDetails(object: ISearchData) {
    const query =  this.sessionDetailsRepo.createQueryBuilder('sd')
    .leftJoin(Departments, 'dept', 'dept.id = sd.departmentId')
    .leftJoin(Designations, 'des', 'des.id = sd.designationId')
    .leftJoin(TeamLeads, 'tl', 'tl.id = sd.leadId')
    .leftJoin(ApprovalTypes, 'at', 'at.id = sd.approvalId')
    .leftJoin(Users, 'u', 'u.id = sd.userId')
    .leftJoin(SessionDetailsMapping, 'sdm', 'sdm.sessionDetailsId = sd.id')
    .select(`
      sd.id as id,
      sd.topic as topic, 
      sd.takingHrs as takingHrs, 
      sd.date as date, 
      at.name as approvalStatus, 
      tl.name as teamLeadName, 
      dept.name as departmentName,
      sdm.fromTime as fromTime,
      sdm.toTime as toTime,
      des.name as designationName,
      sd.approvalId as approvalId,
      sd.createdAt as requestedDate,
      u.name as name
      `)
    .where('sd.isActive = true AND DATE(sd.createdAt) =:date', { date: object.date })
    if (object.search) {
      query.andWhere(
        `(
            at.name LIKE :search or
            des.name LIKE :search or
            dept.name LIKE :search or
            sd.topic LIKE :search or
            DATE_FORMAT(sd.date, '%d-%m-%Y') LIKE :search
          )`,
        { search: `%${object.search}%` }
      );
    }
    return query.getRawMany();
  }

  getMasterApprovalTypes() {
    return this.approvalTypesRepo.createQueryBuilder('at')
    .select(`at.id as id, at.name as name`)
    .where('at.id != 1')
    .getRawMany();
  }
}
