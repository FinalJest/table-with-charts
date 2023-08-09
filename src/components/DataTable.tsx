import {IPerson} from "../types/IPerson";
import {convertDateObjectToString} from "../services/dateService";
import React from "react";

interface DataTableProps {
    data: IPerson[];
}

export default function DataTable(props: DataTableProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Industry</th>
                <th>Salary</th>
                <th>YOE</th>
            </tr>
            </thead>
            <tbody>
            {props.data.map((person) => (
                <tr key={person.id}>
                    <td>{person.id}</td>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.email}</td>
                    <td>{convertDateObjectToString(person.dateOfBirth)}</td>
                    <td>{person.industry}</td>
                    <td>{person.salary}</td>
                    <td>{person.yearsOfExperience}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
