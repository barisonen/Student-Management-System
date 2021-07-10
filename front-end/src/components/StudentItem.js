import React from "react"


const StudentItem = props => {
    const { student } = props;
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media-content">
                    <b style={{ textTransform: "capitalize" }}>
                        {student.name}{" "}
                    </b>
                </div>
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img
                                src={`data:image/png;base64,${student.image}`}
                                alt={student.description}
                            />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentItem;
