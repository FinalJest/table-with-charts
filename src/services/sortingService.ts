import {IPerson} from "../types/IPerson";


export interface PersonSortingOption {
    value: string;
    text: string;
    sortFunction(personA: IPerson, personB: IPerson, isDescending?: boolean): number;
}

export class SortById implements PersonSortingOption {
    value = "id";
    text = "ID";
    sortFunction = (personA: IPerson, personB: IPerson, isDescending?: boolean) =>
        isDescending ? personB.id - personA.id : personA.id - personB.id;
}

export class SortByDOB implements PersonSortingOption {
    value = "DOB";
    text = "Date of Birth";
    sortFunction = (personA: IPerson, personB: IPerson, isDescending?: boolean) => isDescending ?
        personB.dateOfBirth.getTime() - personA.dateOfBirth.getTime() :
        personA.dateOfBirth.getTime() - personB.dateOfBirth.getTime();
}

export class SortByIncome implements PersonSortingOption {
    value = "income";
    text = "Income";
    sortFunction = (personA: IPerson, personB: IPerson, isDescending?: boolean) => {
        // We want to move people without industry to the end
        if (personA.salary === undefined) {
            return 1;
        }
        if (personB.salary === undefined) {
            return -1;
        }
        return isDescending ? personB.salary - personA.salary : personA.salary - personB.salary;
    };
}

export class SortByIndustry implements PersonSortingOption {
    value = "industry";
    text = "Industry";
    sortFunction = (personA: IPerson, personB: IPerson, isDescending?: boolean) => {
        // We want to move people without industry to the end
        if (!personA.industry) {
            return 1;
        }
        if (!personB.industry) {
            return -1;
        }
        const isDescendingModifier = isDescending ? -1 : 1;
        return isDescendingModifier * (personA.industry.toLowerCase() < personB.industry.toLowerCase()
            ? -1
            : 1);
    };
}
