import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSessionDetailDto {}

export class sessionDetailsDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    leaveId: number;

    @IsNumber()
    @IsNotEmpty()
    departmentId: number;

    @IsNumber()
    @IsNotEmpty()
    designationId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    approvalId: number;

    @IsNumber()
    @IsNotEmpty()
    takeHrs: number;

}