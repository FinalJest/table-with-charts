import React from "react";
import {IPerson} from "../types/IPerson";
import {convertDateObjectToString} from "../services/dateService";
import {requestData} from "../services/requestService";

export default function Table() {
    const [data, setData] = React.useState<IPerson[]>([]);
    React.useEffect(() => {
        requestData().then((newData) => {
            setData(newData);
        });
    }, []);

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
                {data.map((person) => (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.email}</td>
                        <td>{convertDateObjectToString(person.dateOfBirth)}</td>
                        <td>{person.id}</td>
                        <td>{person.id}</td>
                        <td>{person.id}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
