import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box';
import { Input, Icon, Tooltip, Button, message } from 'antd';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom'

const success = (a) => {
    message.success(a);
};

const errorr = (a) => {
    message.error(a);
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        // width: "100%",
    },
    formm: {
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            width: "60%"
        },
        [theme.breakpoints.up('lg')]: {
            width: "60%"
        },
    }
});

class Tabss extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0,
            signInLoading: false,
            signUpLoading: false,
            userName: "",
            password: "",
            confirmPassword: "",
            email: "",
            loginEmail: "",
            loginPassword: "",
            stateName: ""
        }
    }

    onAuthStateChanged = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push("/Add")
            } else {

            }
        });
    }

    gettingValues = (name, ev) => {
        this.setState({
            [name]: ev.target.value
        })
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };

    handleChangeIndex = (index) => {
        this.setState({
            value: index
        })
    };

    signIn = (ev) => {
        ev.preventDefault()
        this.setState({
            signInLoading: true
        })
        firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
            .then(() => {
                this.setState({
                    signInLoading: false,
                    userName: "",
                    password: "",
                    confirmPassword: "",
                    email: "",
                    loginEmail: "",
                    loginPassword: "",
                    stateName: ""
                })
                success("Successfully Logged In")
                this.props.history.push("/Add")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                errorr(errorMessage)
            });
    }

    signUp = (ev) => {
        ev.preventDefault()
        this.setState({
            signUpLoading: true
        })
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                let obj = {
                    userName: this.state.userName,
                    email: this.state.email,
                    stateName: this.state.stateName,
                    uid: res.user.uid,
                }
                firebase.database().ref("wholeData").child(res.user.uid)
                    .child("personalInfo").set(obj)
                    .then((res) => {
                        this.setState({
                            signUpLoading: false,
                            userName: "",
                            password: "",
                            confirmPassword: "",
                            email: "",
                            loginEmail: "",
                            loginPassword: "",
                            stateName: ""
                        })
                        success("Successfully Signed Up")
                        this.props.history.push("/Add")
                    })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                errorr(errorMessage)
            });
    }

    componentWillMount() {
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <div className={classes.root} >
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Sign In" {...a11yProps(0)} />
                        <Tab label="Sign Up" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0} >
                        <h2>Sign In</h2>
                        <br />
                        <form className={classes.formm}>
                            <div>
                                <Input
                                    onChange={(ev) => this.gettingValues("loginEmail", ev)}
                                    size="large"
                                    placeholder="Enter your email"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    suffix={
                                        <Tooltip title="Email must be well formated">
                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    type="email"
                                    required
                                />
                                <br />
                                <br />
                                {/* <Input.Password placeholder="input password" /> */}
                                <Input.Password
                                    onChange={(ev) => this.gettingValues("loginPassword", ev)}
                                    size="large"
                                    placeholder="Enter your password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    required
                                />
                                <br />
                                <br />
                                <Button
                                    style={{ float: "left", background: "black", borderColor: "black", width: 100 }}
                                    type="primary"
                                    loading={this.state.signInLoading}
                                    onClick={(ev) => this.signIn(ev)}
                                >
                                    Log In
        </Button>
                                <br />
                                <br />
                                <p>Forgot password ? <a>Reset now..</a></p>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} >
                        <h2>Sign up</h2>
                        <br />
                        <form className={classes.formm}>
                            <div>
                                <Input
                                    onChange={(ev) => this.gettingValues("userName", ev)}
                                    size="large"
                                    placeholder="Enter your username"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    suffix={
                                        <Tooltip title="Enter your username">
                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    required
                                />
                                <br />
                                <br />
                                <Input
                                    onChange={(ev) => this.gettingValues("stateName", ev)}
                                    size="large"
                                    placeholder="State agency name"
                                    prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    suffix={
                                        <Tooltip title="Enter your state agency name">
                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    required
                                />
                                <br />
                                <br />
                                <Input
                                    onChange={(ev) => this.gettingValues("email", ev)}
                                    size="large"
                                    placeholder="Enter your email"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    suffix={
                                        <Tooltip title="Enter your email">
                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    type="email"
                                    required
                                />
                                <br />
                                <br />
                                {/* <Input.Password placeholder="input password" /> */}
                                <Input.Password
                                    onChange={(ev) => this.gettingValues("password", ev)}
                                    size="large"
                                    placeholder="Enter your password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    required
                                />
                                <br />
                                <br />
                                <Input.Password
                                    onChange={(ev) => this.gettingValues("confirmPassword", ev)}
                                    size="large"
                                    placeholder="Confirm password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    required
                                />
                                <br />
                                <br />
                                <Button
                                    style={{ float: "left", background: "black", borderColor: "black", width: 100 }}
                                    type="primary"
                                    loading={this.state.signUpLoading}
                                    onClick={(ev) => this.signUp(ev)}
                                >
                                    Sign Up
        </Button>
                                <br />
                                <br />
                                <p>Forgot password ? <a>Reset now..</a></p>
                            </div>
                        </form>
                    </TabPanel>
                </SwipeableViews>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const matchDispatchToProps = {}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(Tabss)));