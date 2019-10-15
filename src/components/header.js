import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import SideDrawer from './drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { empty } from '../actions/action';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter from './afterLogin/filter';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
        [theme.breakpoints.up('md')]: {
            display: "none"
        },
        [theme.breakpoints.up('lg')]: {
            display: "none"
        },
    },
    title: {
        flexGrow: 1,
        color: "white",
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 18
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 18
        },
    },
    header: {
        background: "black",
        position: "fixed"
    },
    listDiv: {
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            display: "block",
            marginRight: 30
        },
        [theme.breakpoints.up('lg')]: {
            display: "block",
            // marginRight: 50
        },
    },
    list: {
        marginRight: 10
    },
    filter: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            float: "right",
            padding: 0
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 16,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 16,
        },
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: false,
            filterModel: false,
        }
    }

    openDrawer = () => {
        this.setState({
            drawer: true
        })
    }

    drawerClose = () => {
        this.setState({
            drawer: false
        })
    }

    push = (name) => {
        this.props.history.push(`/${name}`)
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.history.push('/')
                let obj = {}
                this.props.empty(obj, "empty")
            }).catch((error) => {
                // An error happened.
            });
    }

    back = () => {
        this.props.history.goBack()
    }

    filter = () => {
        this.setState({
            filterModel: true,
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    filterModel: false
                })
            }, 200)
        })
    }

    render() {
        const { classes } = this.props
        console.log(this.props)
        // console.log(this.props)
        return (
            <div className={classes.root} >
                <AppBar className={classes.header} position="static">
                    <Toolbar>
                        {this.props.login ?
                            <IconButton onClick={this.openDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            :
                            this.props.seemore ?
                                <IconButton onClick={this.back} edge="start" color="inherit" aria-label="menu">
                                    <ArrowBackIosIcon />
                                </IconButton>
                                : null
                        }
                        <Typography variant="h6" className={classes.title}>
                            {this.props.state ?
                                this.props.state.personalInfo ?
                                    <>
                                        {this.props.state.personalInfo.stateName}
                                        {!this.props.seemore ?
                                            <IconButton className={classes.filter} onClick={this.filter} edge="start" color="inherit" aria-label="menu">
                                                Filter <FilterListIcon />
                                            </IconButton>
                                            : null}
                                    </>
                                    : "State agency management..."
                                :
                                null
                            }
                        </Typography>
                        {this.props.login ?
                            <>
                                <div className={classes.listDiv}>
                                    <Button onClick={(ev) => this.push("Add")} style={this.props.add ? { border: "1px solid" } : null} className={classes.list} color="inherit">Add</Button>
                                    <Button onClick={(ev) => this.push("All")} style={this.props.all ? { border: "1px solid" } : null} className={classes.list} color="inherit">All</Button>
                                    <Button onClick={(ev) => this.push("Rent")} style={this.props.rent ? { border: "1px solid" } : null} className={classes.list} color="inherit">Rent</Button>
                                    <Button onClick={(ev) => this.push("Ownership")} style={this.props.ownership ? { border: "1px solid" } : null} className={classes.list} color="inherit">OwnerShip</Button>
                                    <Button onClick={(ev) => this.push("Sold")} style={this.props.sold ? { border: "1px solid" } : null} className={classes.list} color="inherit">Sold</Button>
                                </div>
                                <div style={{ transform: "rotateY(180deg)" }}><ExitToAppIcon style={{ cursor: "pointer" }} onClick={this.signOut} /></div>
                            </>
                            :
                            this.props.seemore ?
                                <div style={{ transform: "rotateY(180deg)" }}><ExitToAppIcon style={{ cursor: "pointer" }} onClick={this.signOut} /></div>
                                : null
                        }
                    </Toolbar>
                </AppBar>
                <SideDrawer drawer={this.state.drawer} drawerClose={this.drawerClose} />
                {this.state.filterModel ?
                    <Filter open={this.state.open} handleClose={this.handleClose} gettingValues={this.props.gettingValues} filter={this.props.filter} />
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const matchDispatchToProps = { empty }

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(Header)));