import React, { Component } from "react"
import {ModalBody, ModalHeader} from "react-bootstrap";
import ModalDialog from "react-bootstrap/lib/ModalDialog";
import { Dialog } from 'primereact/dialog';

export default class AddStudentPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                name: '',
                surname: '',
                phoneNumber: '',
                city: '',
                district: '',
                description: ''
            },
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    };

    handleNameChange(event) {
        let modify_student = {...this.state.student};
        modify_student.name = event.target.value;
        this.setState({student: modify_student});
    }
    handleSurnameChange(event) {
        let modify_student = {...this.state.student};
        modify_student.surname = event.target.value;
        this.setState({student: modify_student});
    }
    handlePhoneNumberChange(event) {
        let modify_student = {...this.state.student};
        modify_student.phoneNumber = event.target.value;
        this.setState({student: modify_student});
    }
    handleCityChange(event) {
        let modify_student = {...this.state.student};
        modify_student.city = event.target.value;
        this.setState({student: modify_student});
    }
    handleDistrictChange(event) {
        let modify_student = {...this.state.student};
        modify_student.district = event.target.value;
        this.setState({student: modify_student});
    }
    handleDescriptionChange(event) {
        let modify_student = {...this.state.student};
        modify_student.description = event.target.value;
        this.setState({student: modify_student});
    }

    handleSubmit(event) {
        let modify_student = {...this.state.student};
        modify_student.name = event.target.value;
        event.preventDefault();
        console.log(this.state.student)
        this.handleClose()
    }

    render() {
        return (
            <div>

                <Dialog
                    header='Add Student'
                    visible={true}
                    modal={true}
                    closable={false}
                >
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <br/>
                            <input type="text" onChange={this.handleNameChange} />
                            <br/>
                            Surname:
                            <br/>
                            <input type="text" onChange={this.handleSurnameChange} />
                            <br/>
                            Phone Number:
                            <br/>
                            <input type="text" onChange={this.handlePhoneNumberChange} />
                            <br/>
                            City:
                            <br/>
                            <input type="text" onChange={this.handleCityChange} />
                            <br/>
                            District:
                            <br/>
                            <input type="text" onChange={this.handleDistrictChange} />
                            <br/>
                            Description:
                            <br/>
                            <input type="text" onChange={this.handleDescriptionChange} />
                            <br/>
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </Dialog>
            </div>
        );
    }
}
