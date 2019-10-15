import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase';
import Header from './components/header';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import Tabss from './components/tabs';

const styles = theme => ({
    form: {
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            overflowY: "scroll",
            scrollbarWidth: "thin",
            width: "90%",
            height: "75vh",
            position: "relative",
            top: "60%",
            left: "50%",
            transform: "translate(-50%,-60%)",
        },
        [theme.breakpoints.up('sm')]: {
            overflowY: "scroll",
            scrollbarWidth: "none",
            width: "60%",
            height: "70vh",
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "block"
        },
        [theme.breakpoints.up('md')]: {
            overflowY: "scroll",
            scrollbarWidth: "none",
            width: "40%",
            height: "63vh",
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "block"
        },
    }
});

class SignInSignUp extends Component {
    constructor() {
        super()
        this.state = {
            data: null
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{height: "100vh"}}>
                <Header />
                <Paper id="scrollNone" className={classes.form}>
                    <Tabss />
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const matchDispatchToProps = {}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(SignInSignUp));
