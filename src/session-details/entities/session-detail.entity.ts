import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

}

@Entity()
export class TeamLeads {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

}

@Entity()
export class Departments {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

}

@Entity()
export class Designations {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

}

@Entity()
export class ApprovalTypes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

}

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @ManyToOne(() => Roles, (e) => e.id)
    @JoinColumn({ name: 'roleId' })
    roleId: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'deletedBy' })
    deletedBy: number;

}

@Entity()
export class SessionDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    topic: string;

    @Column({ nullable: true })
    takingHrs: number;

    @Column({ nullable: true })
    date: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => TeamLeads, (e) => e.id)
    @JoinColumn({ name: 'leadId' })
    leadId: number;

    @ManyToOne(() => Departments, (e) => e.id)
    @JoinColumn({ name: 'departmentId' })
    departmentId: number;

    @ManyToOne(() => Designations, (e) => e.id)
    @JoinColumn({ name: 'designationId' })
    designationId: number;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'userId' })
    userId: number;

    @ManyToOne(() => ApprovalTypes, (e) => e.id)
    @JoinColumn({ name: 'approvalId' })
    approvalId: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'deletedBy' })
    deletedBy: number;
    
}

@Entity()
export class SessionDetailsMapping {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SessionDetails, (e) => e.id)
    @JoinColumn({ name: 'sessionDetailsId' })
    sessionDetailsId: number;

    @Column({ nullable: true, type: 'timestamp' })
    fromTime: Date;

    @Column({ nullable: true, type: 'timestamp' })
    toTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Users, (e) => e.id)
    @JoinColumn({ name: 'deletedBy' })
    deletedBy: number;
    
}