import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDetailDto } from './create-session-detail.dto';

export class UpdateSessionDetailDto extends PartialType(CreateSessionDetailDto) {}
