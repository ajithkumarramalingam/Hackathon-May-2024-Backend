import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { SessionDetailsService } from './session-details.service';
import { Response } from 'express';
import { UtilService } from 'src/core/utils/util/util.service';


@Controller('session-details')
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
      logger.info('Master data got Successfully')

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
}
