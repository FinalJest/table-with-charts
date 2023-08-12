import {IPerson} from "../types/IPerson";

export const getFullName = (person: IPerson): string => `${person.firstName} ${person.lastName}`.toLowerCase();
