// Only implemented for DD/MM/YYYY as this is the format of mock data
export function parseStringToDateObject(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
}

export function convertDateObjectToString(dateObject: Date): string {
    const printedDay = String(dateObject.getDate()).padStart(2, "0");
    const printedMonth = String(dateObject.getMonth() + 1).padStart(2, "0");
    const printedYear = String(dateObject.getFullYear());
    return `${printedDay}/${printedMonth}/${printedYear}`;
}
