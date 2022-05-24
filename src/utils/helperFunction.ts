import dayjs from "dayjs"

/**
 * @param  {any} date
 * @returns string
 */
export const formatDateFromNow = (date: any): string => {
    return dayjs(date).fromNow();
}

/**
 * @param  {any} date
 * @returns string
 */
export const formatDateWithMonth = (date: any): string => {
    return dayjs(date)
        .format('LL')
}

/**
 * @param  {any} date
 * @returns string
 */
export const formatDateWithDayMonth = (date: any): string => {
    return dayjs(date)
        .format('dddd, MMMM D, YYYY');
}

/**
 * @param  {any} date
 * @returns string
 */
export const formatDateMonth = (date: any): string => {
    return dayjs(date)
        .format('YYYY-MM-DD');
}

/**
 * Get Year-Month format
 * @returns string
 */
export const currentMonth = (): string => {
    const currentDate = dayjs();
    return `${currentDate.year()}-${currentDate.month() + 1}`
}

/**
 * Get Extract Year-Month format
 * @returns string
 */
export const extractCurrentMonthYear = (date: any): string => {
    const currentDate = dayjs(date);
    return `${currentDate.year()}-${currentDate.month() + 1}`
}

/**
 * Get Month format
 * @returns string
 */
export const currentMonthOnly = (): string => {
    return `${dayjs().month() + 1}`
}

/**
 * To Check is Weekend
 * @returns boolean
 */
export const isWeekend = (date: any): boolean => {
    const currentDate = dayjs(date);
    return currentDate.day() === 0 || currentDate.day() === 6
}

/**
 * To Check is Today Timesheet
 * @returns boolean
 */
export const isToday = (date: any): boolean => {
    return dayjs().format('l') === dayjs(date).format('l');
}

/**
 * To return current Month And Year only
 * @returns string
 */
export const currentMonthAndYear = (date: any): string => {
    return dayjs(date).format('MMMM YYYY')
}

/**
 * This method to format display percentage with fix 3 digit coma
 * example output: 0.000%
 * @param  {number} num
 * @returns string
 */
export const toFixedFormat = (num: number): string => {
    return `${num.toFixed(3)}%`
}

/**
 * @param  {string} mail
 * @returns boolean
 * Helper to validate email format
 */
export const validateEmail = (mail: string): boolean => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());

}

export const isMatchPassword = (newPassword: string, newConfirmPassword: string) => {
    if ((newPassword.trim().length >= 6) && (newConfirmPassword.trim().length >= 6))
        return newPassword.trim() === newConfirmPassword.trim();
    return false;
};


/**
 * Format Size file function
 */
export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Return File Extentions
 */
export const checkFileExt = (fileName: any) => {
    var fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gim;
    return fileName.includes(".")
        ? fileName.match(fileExtensionPattern)[0]
        : ".exe";
};
