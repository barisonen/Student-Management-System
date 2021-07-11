import React from "react"


const StudentItem = props => {
    const { student } = props;
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media-content">
                    <b style={{ textTransform: "capitalize" }}>
                        {student.name}{" "}{student.surname}
                    </b>
                    <br/>
                    <b>Phone: </b> {student.phoneNumber}
                    <br/>
                    <b>City: </b> {student.city}
                    <br/>
                    <b>District: </b> {student.district}
                    <br/>
                    <b>Description: </b> {student.description}
                    <br/>
                    <br/>

                </div>
            </div>
        </div>
    );
};

export default StudentItem;
