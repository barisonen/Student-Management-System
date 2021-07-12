import React from "react";
import StudentItem from "./StudentItem"
import withContext from "../withContext"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const StudentList = props => {
    const { students } = props.context;

    return (
        <>
            <div className="studentListDiv">
                <h4 className="title">Students</h4>
            </div>
            <div className="container">
                <DataTable value={students}>
                    <Column field='name' header='Name' />
                    <Column field='surname' header='Surname' />
                    <Column field='phoneNumber' header='Phone Number' />
                    <Column field='city' header='City' />
                    <Column field='district' header='District' />
                    <Column field='description' header='Description' />
                </DataTable>
            </div>
        </>
    );
};

export default withContext(StudentList);
