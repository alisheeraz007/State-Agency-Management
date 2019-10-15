import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase';
import Header from '../header';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom'
import { getData } from '../../actions/action';
import { Divider } from 'antd';

const styles = theme => ({
    form: {
        padding: 10,
        [theme.breakpoints.down('sm')]: {
            overflowY: "scroll",
            width: "90%",
            height: "80vh",
            position: "absolute",
            top: "87%",
            left: "50%",
            display: "flex",
            flexFlow: "wrap",
            transform: "translate(-50%,-87%)",
        },
        [theme.breakpoints.up('sm')]: {
            overflowY: "scroll",
            width: "90%",
            height: "87vh",
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%,-80%)",
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "center",
        },
        [theme.breakpoints.up('md')]: {
            overflowY: "scroll",
            width: "90%",
            height: "87vh",
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%,-80%)",
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "center",
        },
    },
    items: {
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            width: "47.5%",
            height: 205,
            margin: 3,
            textAlign: "center",
            fontSize: 10
        },
        [theme.breakpoints.up('sm')]: {
            width: "45%",
            height: 250,
            margin: 10,
            textAlign: "center"
        },
        [theme.breakpoints.up('md')]: {
            width: "45%",
            height: 250,
            margin: 10,
            textAlign: "center"
        },
    },
    cardHead: {
        borderRadius: 5,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            padding: "5px",
            background: "black",
            color: "white",
            fontSize: 12,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 0,
            padding: "7px",
            background: "black",
            color: "white",
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            padding: "7px",
            background: "black",
            color: "white",
        },
    }
});

class AllData extends Component {
    constructor() {
        super()
        this.state = {
            data: null,
            category: "",
            from: "",
            to: "",
            ownershipOrRent: "",
            bedrooms: "",
            matchArray: [],
            open: "ass"
        }
    }

    push = (e, entryNo) => {
        e.preventDefault()
        this.props.history.push({
            pathname: '/SeeMore',
            // search: '?query=abc',
            state: { entryNo: entryNo }
        })
    }

    gettingValues = (name, ev) => {
        if (name === "category" || name === "ownershipOrRent") {
            this.setState({
                [name]: ev
            }, () => {
                console.log(this.state)
            })
        } else {
            this.setState({
                [name]: ev.target.value
            })
        }
    }

    filter = (ev, wholeData, handleClose) => {
        ev.preventDefault();
        let arr = []
        wholeData.filter((obj) => {
            if (obj.category === this.state.category && !this.state.from && !this.state.to) {

                arr.push(obj)

                this.setState({
                    matchArray: arr
                })

            }
            else if (this.state.category && (this.state.from || this.state.to)) {
                if (obj.category === this.state.category
                    && obj.demandingPrice !== ""
                    && Number(obj.demandingPrice) >= this.state.from
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.category === this.state.category
                    && obj.demandingPrice !== ""
                    && this.state.from === ""
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.category === this.state.category
                    && obj.demandingPrice !== ""
                    && this.state.to === ""
                    && Number(obj.demandingPrice) >= this.state.from) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else {
                    this.setState({
                        matchArray: arr
                    })
                }
            }

            else if (!this.state.category && (this.state.from || this.state.to)) {
                if (obj.demandingPrice !== ""
                    && Number(obj.demandingPrice) >= this.state.from
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.demandingPrice !== ""
                    && this.state.from === ""
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.demandingPrice !== ""
                    && this.state.to === ""
                    && Number(obj.demandingPrice) >= this.state.from) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else {
                    this.setState({
                        matchArray: arr
                    })
                }
            }

            else if (this.state.category && (this.state.from || this.state.to)) {
                if (obj.category === this.state.category
                    && Number(obj.bedrooms) === Number(this.state.bedrooms)
                    && Number(obj.demandingPrice) >= this.state.from
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.category === this.state.category
                    && obj.demandingPrice !== ""
                    && this.state.from === ""
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.category === this.state.category
                    && obj.demandingPrice !== ""
                    && this.state.to === ""
                    && Number(obj.demandingPrice) >= this.state.from) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else {
                    this.setState({
                        matchArray: arr
                    })
                }
            }

            else if (!this.state.category && (this.state.from || this.state.to)) {
                if (obj.demandingPrice !== ""
                    && Number(obj.demandingPrice) >= this.state.from
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.demandingPrice !== ""
                    && this.state.from === ""
                    && Number(obj.demandingPrice) <= this.state.to) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else if (obj.demandingPrice !== ""
                    && this.state.to === ""
                    && Number(obj.demandingPrice) >= this.state.from) {

                    arr.push(obj)

                    this.setState({
                        matchArray: arr
                    })

                } else {
                    this.setState({
                        matchArray: arr
                    })
                }
            }
        })
        handleClose()
        this.setState({
            category: "",
            from: "",
            to: "",
        })
    }

    render() {
        console.log(this.state.matchArray)
        const { classes } = this.props;
        return (
            <>
                <Header open={this.state.open} login="true" all={true} gettingValues={this.gettingValues} filter={this.filter} />
                <Paper id="scrollNone" className={classes.form}>
                    {this.props.state.added ?
                        !this.state.matchArray.length ?
                            Object.values(this.props.state.added).map((obj) => {
                                return (
                                    <Paper className={classes.items}>
                                        <h2 className={classes.cardHead}>{obj.category}</h2>
                                        <Divider style={{ margin: 0 }} />
                                        <table style={{ width: "100%", height: "70%" }}>
                                            <tbody style={{ textAlign: "left" }}>
                                                {obj.rentOrOwnership ?
                                                    <tr>
                                                        <th>sell Type:</th>
                                                        <td>&nbsp;{obj.rentOrOwnership}</td>
                                                    </tr>
                                                    : null}
                                                {obj.bedrooms ?
                                                    <tr>
                                                        <th>Bedrooms:</th>
                                                        <td>&nbsp;{obj.bedrooms}</td>
                                                    </tr>
                                                    : null}
                                                {obj.bathrooms ?
                                                    <tr>
                                                        <th>Bathrooms:</th>
                                                        <td>&nbsp;{obj.bathrooms}</td>
                                                    </tr>
                                                    : null}
                                                <tr>
                                                    <th>Telling Price:</th>
                                                    <td> &nbsp;{obj.demandingPrice}</td>
                                                </tr>
                                                <tr>
                                                    <th>Final Price:</th>
                                                    <td>&nbsp;{obj.finalPrice}</td>
                                                </tr>

                                                {obj.advance ?
                                                    <tr>
                                                        <th>Advance:</th>
                                                        <td>&nbsp;{obj.advance}</td>
                                                    </tr>
                                                    : null}
                                                {obj.timePeriod ?
                                                    <tr>
                                                        <th>Time Period:</th>
                                                        <td>&nbsp;{obj.timePeriod}</td>
                                                    </tr>
                                                    : null}
                                            </tbody>
                                        </table>
                                        <Divider style={{ margin: 0 }} />
                                        <Link to={`SeeMore/${obj.entryNo}`} ><a>See More.....</a></Link>
                                    </Paper>
                                )
                            })
                            :
                            this.state.matchArray.map((obj) => {
                                return (
                                    <Paper className={classes.items}>
                                        <h2 className={classes.cardHead}>{obj.category}</h2>
                                        <Divider style={{ margin: 0 }} />
                                        <table style={{ width: "100%", height: "70%" }}>
                                            <tbody style={{ textAlign: "left" }}>
                                                {obj.rentOrOwnership ?
                                                    <tr>
                                                        <th>sell Type:</th>
                                                        <td>&nbsp;{obj.rentOrOwnership}</td>
                                                    </tr>
                                                    : null}
                                                {obj.bedrooms ?
                                                    <tr>
                                                        <th>Bedrooms:</th>
                                                        <td>&nbsp;{obj.bedrooms}</td>
                                                    </tr>
                                                    : null}
                                                {obj.bathrooms ?
                                                    <tr>
                                                        <th>Bathrooms:</th>
                                                        <td>&nbsp;{obj.bathrooms}</td>
                                                    </tr>
                                                    : null}
                                                <tr>
                                                    <th>Telling Price:</th>
                                                    <td> &nbsp;{obj.demandingPrice}</td>
                                                </tr>
                                                <tr>
                                                    <th>Final Price:</th>
                                                    <td>&nbsp;{obj.finalPrice}</td>
                                                </tr>

                                                {obj.advance ?
                                                    <tr>
                                                        <th>Advance:</th>
                                                        <td>&nbsp;{obj.advance}</td>
                                                    </tr>
                                                    : null}
                                                {obj.timePeriod ?
                                                    <tr>
                                                        <th>Time Period:</th>
                                                        <td>&nbsp;{obj.timePeriod}</td>
                                                    </tr>
                                                    : null}
                                            </tbody>
                                        </table>
                                        <Divider style={{ margin: 0 }} />
                                        <Link to={`SeeMore/${obj.entryNo}`} ><a>See More.....</a></Link>
                                    </Paper>
                                )
                            })
                        : null}
                </Paper>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const matchDispatchToProps = { getData }

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(AllData)));
