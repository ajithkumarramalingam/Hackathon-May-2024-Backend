import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSessionDetailDto {}

export class sessionDetailsDto {

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    topic: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    leadId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    departmentId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    designationId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    takingHrs: number;

}

export class adminApprovalDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    approvalId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    fromTime: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    toTime: string;

}

export class loginDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}

export class searchDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    date: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    search: string;

}