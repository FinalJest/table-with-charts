import {IPerson} from "../types/IPerson";
import {parseStringToDateObject} from "./dateService";

interface ResponseDataElement {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    date_of_birth: string;
    industry: string | null;
    salary: number | null;
    years_of_experience: number | null;
}

type ResponseData = ResponseDataElement[];

function parseDataElement(dataElement: ResponseDataElement): IPerson {
    return {
        id: dataElement.id,
        firstName: dataElement.first_name ?? undefined,
        lastName: dataElement.last_name ?? undefined,
        email: dataElement.email ?? undefined,
        dateOfBirth: parseStringToDateObject(dataElement.date_of_birth),
        industry: dataElement.industry ?? undefined,
        salary: dataElement.salary ?? undefined,
        yearsOfExperience: dataElement.years_of_experience ?? undefined,
    };
}

const parseData = (data: ResponseData): IPerson[] => data.map(parseDataElement);

export async function requestData(): Promise<IPerson[]> {
    const response = await fetch("/MOCK_DATA.json");
    const data = await response.json() as ResponseData;
    return parseData(data);
}
