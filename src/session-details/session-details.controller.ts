import { Controller, Get, Res, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { SessionDetailsService } from './session-details.service';
import { Response } from 'express';
import { UtilService } from 'src/core/utils/util/util.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { adminApprovalDto, loginDto, searchDto, sessionDetailsDto } from './dto/create-session-detail.dto';
import { approveTypes, roles } from 'src/core/variables/enum';
import { IAdminStatus, IAdminTiming } from 'src/core/variables/interface';
import { Roles } from './entities/session-detail.entity';


@Controller('session-details')
@ApiBearerAuth()
@ApiTags('session-details')
export class SessionDetailsController {
  constructor(
    private readonly sessionDetailsService: SessionDetailsService,
    private readonly utilService: UtilService
  ) { }

  @Get('getMasterData')
  async getMasterData(@Res() res: Response) {
    const logger = this.utilService.createLogger(SessionDetailsController.name)
    try {
      const data = await this.sessionDetailsService.getMasterData();
      logger.info('Master data got successfully')

      res.status(HttpStatus.OK).json({
        message: 'Master data got successfully',
        status: true,
        departmentDetails: data.departmentDetails,
        teamLeadsDetails: data.teamLeadsDetails,
        designationDetails: data.designationDetails
      });
    }
    catch (error) {
      console.log(error);
      logger.error('Something went wrong')
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Post('saveSessionDetails')
  async saveSessionDetails(@Res() res: Response, @Body() data: sessionDetailsDto) {
    const logger = this.utilService.createLogger(SessionDetailsController.name);
    try {
      const sessionExist = await this.sessionDetailsService.getSessionExist(data.userId);
      if(sessionExist) {
        return res.status(HttpStatus.OK).json({
          message: `Today, you've already applied one session. You can add another one tomorrow`,
          status: false
        });
      }
      console.log('data------------------',data);
      data['approvalId'] = approveTypes.PENDING;
      data['userId'] = 2;
      await this.sessionDetailsService.saveSessionDetails(data);

      logger.info('Save session details successfully')
      res.status(HttpStatus.OK).json({
        message: 'Save session details successfully',
        status: true
      });
    }
    catch (error) {
      console.log(error)
      logger.error('Something went wrong')
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Post('getSessionDetails')
  async getSessionDetails(@Res() res: Response, @Body() object: searchDto) {
    const logger = this.utilService.createLogger(SessionDetailsController.name)
    try {
      console.log('object',object);
      const data = await this.sessionDetailsService.getSessionDetails(object);
      logger.info('Get session details got successfully')
      res.status(HttpStatus.OK).json({
        message: 'Get session details got successfully',
        status: true,
        data: data
      });
    }
    catch (error) {
      console.log(error);
      logger.error('Something went wrong')
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Post('adminApproved')
  async adminApproved(@Res() res: Response, @Body() data: adminApprovalDto) {
    const logger = this.utilService.createLogger(SessionDetailsController.name);
    try {
      console.log('data',data);
      const adminStatus: IAdminStatus = {
        id: data.id,
        approvalId: data.approvalId
      }

      const sessionDetailsId = await this.sessionDetailsService.saveAdminSessionDetails(adminStatus);
      logger.info('Admin status marked successfully')

      if (data.fromTime && data.toTime) {
        console.log('dddddddddd');
        const adminTiming: IAdminTiming = {
          sessionDetailsId: sessionDetailsId.id,
          fromTime: data.fromTime,
          toTime: data.toTime
        }
        await this.sessionDetailsService.saveAdminStatus(adminTiming);
        logger.info('Admin save timing marked successfully')
      }

      res.status(HttpStatus.OK).json({
        message: 'Admin status marked successfully',
        status: true
      });
    }
    catch (error) {
      console.log(error)
      logger.error('Something went wrong')
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() data: loginDto) {
    const logger = this.utilService.createLogger(SessionDetailsController.name);
    try {
      let role: number;
      const roleId = await this.sessionDetailsService.checkLoginCredential(data);
      console.log('roleId', roleId);
      if (roleId) {
        if (roleId.roleId === roles.ADMIN) {
          role = roles.ADMIN;
        } else if (roleId.roleId === roles.USER) {
          role = roles.USER;
        }
        res.status(HttpStatus.OK).json({
          message: 'Login successfully',
          status: true,
          role: role
        });
      } else {
        return res.status(HttpStatus.OK).json({
          message: 'Invalid login',
          status: false,
        });
      }
    } catch (error) {
      console.log(error);
      logger.error('Something went wrong');
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Get('removeSession/:removeId')
  async removeSession(@Res() res: Response, @Param('removeId') removeId: number) {
    const logger = this.utilService.createLogger(SessionDetailsController.name);
    try {
      console.log('removeId',removeId);
      await this.sessionDetailsService.removeSession(removeId);
      logger.info('Session removed successfully')

      res.status(HttpStatus.OK).json({
        message: 'Session removed successfully',
        status: true,
      });
    } catch (error) {
      console.log(error);
      logger.error('Something went wrong');
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Post('getUserSessionDetails')
  async getUserSessionDetails(@Res() res: Response, @Body() object: searchDto) {
    const logger = this.utilService.createLogger(SessionDetailsController.name)
    try {
      console.log('object',object);
      const data = await this.sessionDetailsService.getUserSessionDetails(object);
      logger.info('Get user session details got successfully')
      res.status(HttpStatus.OK).json({
        message: 'Get user session details got successfully',
        status: true,
        data: data
      });
    }
    catch (error) {
      console.log(error);
      logger.error('Something went wrong')
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }

  @Get('getMasterApprovalTypes')
  async getMasterApprovalTypes(@Res() res: Response) {
    const logger = this.utilService.createLogger(SessionDetailsController.name)
    try {
      const data = await this.sessionDetailsService.getMasterApprovalTypes();
      logger.info('Approval types got successfully')
      res.status(HttpStatus.OK).json({
        message: 'Approval types got successfully',
        status: true,
        data: data
      });
    }
    catch (error) {
      console.log(error);
      logger.error('Something went wrong')
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Something went wrong',
        status: false
      });
    }
  }
  
}
