import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import StudentList from './components/StudentList'
import './App.css';
import StudentService from './services/StudentService';
import Context from './Context'
import AddStudentPopup from './components/AddStudentPopup'
import CityDistrictService from './services/CityDistrictService';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            showPopup: false
        };
        this.routerRef = React.createRef();
        this.studentService = new StudentService();
        this.createDummyList = this.createDummyList.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.cityDistrictService = new CityDistrictService();
    }

    async componentDidMount() {
        const students = await this.studentService.getStudentList();
        this.setState( { students: students.data } );

        await this.cityDistrictService.loadCityAndDistricts();

    }

    togglePopup = () => {
        this.setState({showPopup: !this.state.showPopup});
    }

    stateRefresher = () => {
        const sameStudents = this.state.students;
        const sameShowPopup = this.state.showPopup;
        this.setState({students : sameStudents, showPopup : sameShowPopup})
        this.forceUpdate()
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
                <Context.Provider
                    value={{
                        ...this.state
                    }}
                >
                    <Router ref={this.routerRef}>
                        <Button className="button" onClick={this.createDummyList}>
                            Create Dummy List
                        </Button>
                        <Button className="button" onClick={this.removeAll}>
                            Remove All
                        </Button>
                        <Button className="button" onClick={this.togglePopup}>Add Student</Button>
                        {this.state.showPopup ? <AddStudentPopup toggle={this.togglePopup} stateRefresher={this.stateRefresher}/> : null}
                        <Switch>
                            <Route exact path="/" component={StudentList} />
                            <Route exact path="/students" component={StudentList} />
                        </Switch>
                    </Router>
                </Context.Provider>
            </>
        )
    }
};
