import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import StudentList from './components/StudentList'
import './App.css';
import StudentService from './services/StudentService';
import Context from './Context'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
        this.routerRef = React.createRef();
        this.studentService = new StudentService();
        this.createDummyList = this.createDummyList.bind(this);
        this.removeAll = this.removeAll.bind(this);
    }

    async componentDidMount() {
        const students = await this.studentService.getStudentList();

        this.setState( { students: students.data } );
    }

    removeAll() {
        this.studentService.removeAll().then();
        this.setState( {
            products: this.studentService.getStudentList()
        });
    }

    createDummyList() {
        this.studentService.createDummyList().then();
        this.setState(this.state);
    }

    render() {
        return (
            <>
                <button onClick={this.createDummyList}>
                    Create Dummy List
                </button>
                <button onClick={this.removeAll}>
                        Remove All
                </button>
                <Context.Provider
                    value={{
                        ...this.state
                    }}
                >
                    <Router ref={this.routerRef}>
                        <nav className="navbar"
                             role="navigation"
                             aria-label="main-navigation"
                             >
                            <Link to="/students" className="navbar-item">
                                Students
                            </Link>
                        </nav>
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
