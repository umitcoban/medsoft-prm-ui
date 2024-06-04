interface AccountsCount {
    month_count?: number,
    total_count?: number,
    user_count?: number,
    admin_count?: number,
    doctor_count?: number,
    today_count?: number,
    year_count?: number
};

interface AccountsCountWithDate {
    date?: Date,
    count?: number
};


interface AccountAnalytic{
    accountsCount: AccountsCount,
    accountsCountWithDate: AccountsCountWithDate[]
}