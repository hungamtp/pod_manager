

export interface DashboardDto{
    orderCountCurrentMonth: number;
    designCount: number;
    orderCount:number;
    designSoldCount: number;
    income: number;
    incomeCurrentMonth: number;
    countMomoOrder: number;
    countZaloPayOrder: number;
    categorySoldCountProjections : {
        id: string;
        name: string;
        image: string;
        count: number;
    }[]
}
export interface DashboardFactoryDto{
    income: number;
    incomeCurrentMonth: number;
    inProcessOrder: number;
    doneOrder: number;
}