import { Controller, Get, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { SessionDetailsService } from './session-details.service';
import { Response } from 'express';
import { UtilService } from 'src/core/utils/util/util.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { sessionDetailsDto } from './dto/create-session-detail.dto';


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

  @Get('getSessionDetails')
  async getSessionDetails(@Res() res: Response) {
    const logger = this.utilService.createLogger(SessionDetailsController.name)
    try {
      const data = await this.sessionDetailsService.getSessionDetails();
      logger.info('Master data got successfully')

      res.status(HttpStatus.OK).json({
        message: 'Master data got successfully',
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
