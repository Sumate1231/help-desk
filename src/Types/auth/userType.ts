export interface User {
    status:             Status;
    change_branch_code: string;
    branch_list:        BranchList[];
    token:              string;
    expiration:         Date;
}

export interface BranchList {
    branchCode: string;
    branchName: string;
    runDoc:     string;
}

export interface Status {
    statusCode:    number;
    statusMessage: string;
    success:       boolean;
}