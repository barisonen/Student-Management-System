import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import StudentList from './components/StudentList'
import './App.css';
import StudentService from './services/StudentService';
import Context from './Context'
import { Country, State, City }  from 'country-state-city';
import AddStudentPopup from './components/AddStudentPopup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
    }

    async componentDidMount() {
        const students = await this.studentService.getStudentList();

        this.setState( { students: students.data } );


        Country.getAllCountries().map((country) => {
            if(country.name === "Turkey") {
                console.log(country)
            }
        })
        State.getAllStates().map((state) => {
            if(state.countryCode === "TR") {
                console.log(state)
            }
        })
    }

    togglePopup = () => {
        this.setState({showPopup: !this.state.showPopup});
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
                        <nav className="navbar container"
                             role="navigation"
                             aria-label="main-navigation"
                        >
                            <div className="navbar-menu">
                                <Link to="/students" className="navbar-item">
                                    Students
                                </Link>
                            </div>
                        </nav>
                        <button className="button" onClick={this.createDummyList}>
                            Create Dummy List
                        </button>
                        <button className="button" onClick={this.removeAll}>
                            Remove All
                        </button>
                        <button className="button" onClick={this.togglePopup}>Add Student</button>
                        {this.state.showPopup ? <AddStudentPopup toggle={this.togglePopup} /> : null}
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
