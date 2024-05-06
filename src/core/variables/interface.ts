export interface IMaster {
    id: number,
    name: string
}

export interface ISessionDetails {
    name: string,
    topic: string,
    date: string,
    leadId: number,
    departmentId: number,
    designationId: number,
    userId: number,
    takingHrs: number,
    approvalId?: number  
}

export interface IAdminStatus {
    id: number,
    approvalId: number
}

export interface IAdminTiming {
    fromTime: string,
    toTime: string,
    sessionDetailsId: number
}

export interface ISearchData {
    search: string,
    date: string
}