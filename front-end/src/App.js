import React, { Component } from "react";

import StudentList from './components/StudentList'
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


export default class App extends Component {
    render() {
        return (
            <>
                <StudentList/>
            </>
        )
    }
};
