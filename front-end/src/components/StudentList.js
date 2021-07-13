import React, {Component} from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import StudentService from "../services/StudentService";

import CityDistrictService from "../services/CityDistrictService";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {InputMask} from "primereact/inputmask";

export default class StudentList extends Component {

    constructor(props) {
        super(props);

        this.studentService = new StudentService();
        this.createDummyList = this.createDummyList.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.state = {
            student: {
                id: '',
                name: '',
                surname: '',
                phoneNumber: '',
                city: '',
                district: '',
                description: '',
                file: {}
            },
            students: [],
            citySelectItems: [],
            districtSelectItems: [],
            selectedFile: null,
            showPopup: false,
            showEditPopup: false,
            selectedRow: null,
            currentStudentId: ''
        }

        this.cityDistrictService = new CityDistrictService();
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.myUploader = this.myUploader.bind(this);
        this.togglePopup = this.togglePopup.bind(this)
        this.actionTemplate = this.actionTemplate.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.toggleEditPopup = this.toggleEditPopup.bind(this)

    }

    getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object

                baseURL = reader.result;

                resolve(baseURL);
            };
        });
    };

    async onEdit(rowData) {
        await this.setState({showEditPopup : true, selectedRow: rowData, currentStudentId: rowData.id})
    }

    async onDelete(rowData) {
        await this.setState({selectedRow: rowData, currentStudentId: rowData.id})
        await this.studentService.removeStudent(this.state.currentStudentId);
        const students = await this.studentService.getStudentList();
        await this.setState( { students: students.data } );
    }

    actionTemplate = (rowData, column) => {
        return (
            <div>
                <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-warning"
                    style={{ marginRight: ".5em" }}
                    onClick={this.onEdit.bind(this, rowData)}
                />
                <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={this.onDelete.bind(this, rowData)}
                />
            </div>
        );
    }

    async myUploader(event) {

        let file = event.files[0]
        this.getBase64(file).then(result => {
            file["base64"] = result;
            let modify_student = {...this.state.student}
            modify_student.file = result

            this.setState({student : modify_student})
        }).catch(err => {
            console.log(err)
        })
    }

    togglePopup() {
        this.setState({showPopup: !this.state.showPopup})
    }

    toggleEditPopup() {
        this.setState({showEditPopup: !this.state.showEditPopup})
    }

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
        modify_student.phoneNumber = event.value;
        this.setState({student: modify_student});
    }
    async handleCityChange(event) {
        let modify_student = {...this.state.student};
        modify_student.city = event.target.value;
        await this.setState({student: modify_student});
        const districtSelectItems = await this.cityDistrictService.getDistrictsOfACity(this.state.student.city)

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

    async handleSubmit(event) {
        event.preventDefault();
        await this.studentService.addStudent(this.state.student);
        const students = await this.studentService.getStudentList();
        await this.setState( { students: students.data, student: {} } );
        this.togglePopup();
    }

    async handleEditSubmit(event) {
        let modify_student = {...this.state.student};
        modify_student.id = this.state.currentStudentId;
        await this.setState({student: modify_student})
        event.preventDefault();
        await this.studentService.editStudent(this.state.student);
        const students = await this.studentService.getStudentList();
        await this.setState( { students: students.data } );
        this.toggleEditPopup();
    }

    async componentDidMount() {
        await this.cityDistrictService.loadCityAndDistricts();
        const citySelectItems = await this.cityDistrictService.getCities();
        this.setState( { citySelectItems: citySelectItems.data } );
        const students = await this.studentService.getStudentList();
        await this.setState( { students: students.data } );
    }

    async removeAll() {
        await this.studentService.removeAll();
        await this.studentService.getStudentList().then(res=> {
            this.setState( {
                students: res.data
            });
        })
    }

    async createDummyList() {
        await this.studentService.createDummyList();
        await this.studentService.getStudentList().then(res => {
            this.setState( {
                students: res.data
            });
        });
    }


    render() {
        return (
            <>
                {this.state.showEditPopup ?
                    <div>
                        <Dialog
                            header='Add Student'
                            visible={true}
                            modal={true}
                            closable={true}
                            onHide={this.toggleEditPopup}
                        >
                            <form onSubmit={this.handleEditSubmit}>
                                <label>
                                    Name:
                                    <br/>
                                    <input type="text" defaultValue={this.state.selectedRow.name} onChange={this.handleNameChange} />
                                    <br/>
                                    Surname:
                                    <br/>
                                    <input type="text" defaultValue={this.state.selectedRow.surname} onChange={this.handleSurnameChange} />
                                    <br/>
                                    Phone Number:
                                    <br/>
                                    <InputMask
                                        mask={'(999) 999-9999'}
                                        value={this.state.student.phoneNumber}
                                        placeholder={'(999) 999-9999'}
                                        onChange={this.handlePhoneNumberChange}
                                    />
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
                                        placeholder='Select a District'

                                    />
                                    <br/>
                                    Description:
                                    <br/>
                                    <input type="text" defaultValue={this.state.selectedRow.description} onChange={this.handleDescriptionChange} />
                                    <br/>
                                    <FileUpload name="demo" customUpload uploadHandler={this.myUploader} enctype="multipart/form-data"/>
                                    <br/>
                                </label>
                                <br/>
                                <Button type="submit" value="Submit">Submit</Button>
                            </form>
                        </Dialog>

                    </div>
                    :
                    null
                }
                {this.state.showPopup ?
                    <div>
                        <Dialog
                            header='Add Student'
                            visible={true}
                            modal={true}
                            closable={true}
                            onHide={this.togglePopup}
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
                                    <InputMask
                                        mask={'(999) 999-9999'}
                                        value={this.state.student.phoneNumber}
                                        placeholder={'(999) 999-9999'}
                                        onChange={this.handlePhoneNumberChange}
                                    />
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
                                        placeholder='Select a District'

                                    />
                                    <br/>
                                    Description:
                                    <br/>
                                    <input type="text" onChange={this.handleDescriptionChange} />
                                    <br/>
                                    <FileUpload name="demo" customUpload uploadHandler={this.myUploader}/>
                                    <br/>
                                </label>
                                <br/>
                                <Button type="submit" value="Submit">Submit</Button>
                            </form>
                        </Dialog>

                    </div>
                    :
                    null
                }
                <Button className="button" onClick={this.createDummyList}>
                    Create Dummy List
                </Button>
                <Button className="button" onClick={this.removeAll}>
                    Remove All
                </Button>
                <Button className="button" onClick={this.togglePopup}>Add Student</Button>
                <div className="studentListDiv">
                    <h4 className="title">Students</h4>
                </div>
                <div className="container">
                    <DataTable value={this.state.students}>
                        <Column field='name' header='Name' />
                        <Column field='surname' header='Surname' />
                        <Column field='phoneNumber' header='Phone Number' />
                        <Column field='city' header='City' />
                        <Column field='district' header='District' />
                        <Column field='description' header='Description' />
                        <Column field='file' header='File'/>
                        <Column
                            header="Edit / Delete"
                            body={this.actionTemplate}
                            style={{ textAlign: "center", width: "8em" }}

                        />
                    </DataTable>
                </div>
            </>
        );
    }
};

