import React, { Component } from "react"
import { Dialog } from 'primereact/dialog';
import CityDistrictService from '../services/CityDistrictService';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import StudentService from '../services/StudentService';

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
                description: '',
                files: []
            },

            citySelectItems: [],
            districtSelectItems: [],
            selectedFile: null
        }
        this.studentService = new StudentService();
        this.cityDistrictService = new CityDistrictService();
        this.handleClose = this.handleClose.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myUploader = this.myUploader.bind(this);


    }

    async myUploader(event) {
       await this.setState({files : event.files})
        console.log(this.state.files)
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
    async handleCityChange(event) {
        let modify_student = {...this.state.student};
        modify_student.city = event.target.value;
        await this.setState({student: modify_student});
        const districtSelectItems = await this.cityDistrictService.getDistrictsOfACity(this.state.student.city)
        console.log(districtSelectItems)
        await this.setState({districtSelectItems : districtSelectItems.data})
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
        this.studentService.addStudent(this.state.student);
        this.props.stateRefresher();
        this.handleClose();
    }

    async componentDidMount() {
        const citySelectItems = await this.cityDistrictService.getCities();
        this.setState( { citySelectItems: citySelectItems.data } );


    }

    render() {
        return (
            <div>
                <Dialog
                    header='Add Student'
                    visible={true}
                    modal={true}
                    closable={true}
                    onHide={this.handleClose}
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
                            <Dropdown

                                value={this.state.student.city}
                                options={this.state.citySelectItems}
                                onChange={this.handleCityChange}
                                placeholder='Select a City'
                            />
                            <br/>
                            District:
                            <br/>
                            <Dropdown

                                value={this.state.student.district}
                                options={this.state.districtSelectItems}
                                onChange={this.handleDistrictChange}
                                placeholder='Select a City'
                            />
                            <br/>
                            Description:
                            <br/>
                            <input type="text" onChange={this.handleDescriptionChange} />
                            <br/>
                            <FileUpload name="demo" customUpload uploadHandler={this.myUploader} />
                            <br/>
                        </label>
                        <br/>
                        <Button type="submit" value="Submit">Submit</Button>
                    </form>
                </Dialog>

            </div>
        );
    }
}
