import React from "react";
import StudentItem from "./StudentItem"
import withContext from "../withContext"

const StudentList = props => {
    const { students } = props.context;

    return (
        <>
            <div className="studentListDiv">
                <h4 className="title">Students</h4>
            </div>
            <div className="container">
                {students && students.length ? (
                    students.map((student, index) => (
                        <StudentItem
                            student={student}
                        />
                    ))
                ) : (
                        <div className="column">
                            <span className="title has-text-grey-light">
                                There are no students
                            </span>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default withContext(StudentList);
