import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase';
import Header from '../header';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { getData } from '../../actions/action';
import { Divider, Icon, Button, Modal } from 'antd';
import Add from './add';

const styles = theme => ({
    form: {
        padding: 5,
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            overflowY: "scroll",
            width: "90%",
            height: "80vh",
            position: "absolute",
            top: "87%",
            left: "50%",
            transform: "translate(-50%,-87%)",
        },
        [theme.breakpoints.up('sm')]: {
            overflowY: "scroll",
            width: "60%",
            height: "75vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "block"
        },
        [theme.breakpoints.up('md')]: {
            overflowY: "scroll",
            width: "40%",
            height: "70vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "block"
        },
    },
    head: {
        fontWeight: "bold",
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        },
        [theme.breakpoints.up('sm')]: {

        },
        [theme.breakpoints.up('md')]: {

        },
    },
    innerHead: {
        fontWeight: "bold",
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.up('sm')]: {

        },
        [theme.breakpoints.up('md')]: {

        },
    },
    roundDiv: {
        width: "90%",
        border: "1px solid lightgrey",
        borderRadius: 5,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10
    },
    table: {
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "70%"
        },
        [theme.breakpoints.up('md')]: {
            width: "60%"
        },
    },
    editIcon: {
        float: "right",
        marginRight: 20,
        color: "#1890ff",
    }
});

class SeeMore extends Component {
    constructor() {
        super()
        this.state = {
            data: null,
            edit: false,
            visible: false,
            confirmLoading: false
        }
    }

    editTrue = () => {
        this.setState({
            edit: true
        })
    }

    editFalse = () => {
        this.setState({
            edit: false
        })
    }

    delete = (entryNo) => {
        this.setState({
            confirmLoading: true
        }, () => {
            firebase.database().ref("wholeData").child(this.props.state.personalInfo.uid)
                .child("added").child(entryNo).remove()
                .then((res) => {
                    this.setState({
                        visible: false,
                        confirmLoading: false
                    })
                    this.props.history.goBack()
                })
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    visibleTrue=()=>{
        this.setState({
            visible: true
        })
    }

    render() {
        console.log(this.props)
        const { classes } = this.props;
        let data;
        if (this.props.state.added) {
            data = this.props.state.added[this.props.match.params.topicId]
        } else {
            data = false
        }
        return (
            <>
                <Header back={true} seemore={false} add={true} />
                {this.state.edit ?
                    <Add edit={true} editFalse={this.editFalse} obj={data} />
                    :
                    <Paper id="scrollNone" className={classes.form}>
                        {data ?
                            <>
                                <h1 className={classes.head} style={{ width: "100%", textAlign: "left" }}>{data.category}
                                    <span className={classes.editIcon}>
                                        <Icon onClick={this.editTrue} type="edit" theme="filled" />
                                        <Icon onClick={this.visibleTrue} style={{ color: "#ff00009e", marginLeft: 10 }} type="delete" theme="filled" />
                                            <Modal
                                                title="Confirmation"
                                                visible={this.state.visible}
                                                onOk={(ev) => this.delete(data.entryNo)}
                                                okText="Delete"
                                                
                                                confirmLoading={this.state.confirmLoading}
                                                onCancel={this.handleCancel}
                                            >
                                                <p>Are you sure you want to delete <span style={{ fontWeight: "bold" }}>{data.entryNo}</span> this entry ?</p>
                                            </Modal>
                                    </span>
                                </h1>
                                <Divider style={{ margin: 0 }} />
                                <div className={classes.roundDiv}>
                                    <h3 className={classes.innerHead}>Owner Details</h3>
                                    <Divider style={{ margin: 0 }} />
                                    <table className={classes.table} style={{ textAlign: "left" }}>
                                        <tbody>
                                            <tr>
                                                <th>Owner's Name:</th>
                                                <td>&nbsp;{data.ownerName}</td>
                                            </tr>
                                            <tr>
                                                <th>Owner's Number:</th>
                                                <td>&nbsp;{data.ownerNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={classes.roundDiv}>
                                    <h3 className={classes.innerHead}>{data.category} Details</h3>
                                    <Divider style={{ margin: 0 }} />
                                    <table className={classes.table} style={{ textAlign: "left" }}>
                                        <tbody>
                                            {data.rentOrOwnership ?
                                                <tr>
                                                    <th>sell Type:</th>
                                                    <td>&nbsp;{data.rentOrOwnership}</td>
                                                </tr>
                                                : null}
                                            {data.floor ?
                                                <tr>
                                                    <th>Floor:</th>
                                                    <td>&nbsp;{data.floor}</td>
                                                </tr>
                                                : null}
                                            {data.bedrooms ?
                                                <tr>
                                                    <th>Bedrooms:</th>
                                                    <td>&nbsp;{data.bedrooms}</td>
                                                </tr>
                                                : null}
                                            {data.bathrooms ?
                                                <tr>
                                                    <th>Bathrooms:</th>
                                                    <td>&nbsp;{data.bathrooms}</td>
                                                </tr>
                                                : null}
                                            <tr>
                                                <th>Telling Price:</th>
                                                <td> &nbsp;{data.demandingPrice}</td>
                                            </tr>
                                            <tr>
                                                <th>Final Price:</th>
                                                <td>&nbsp;{data.finalPrice}</td>
                                            </tr>

                                            {data.advance ?
                                                <tr>
                                                    <th>Advance:</th>
                                                    <td>&nbsp;{data.advance}</td>
                                                </tr>
                                                : null}
                                            {data.timePeriod ?
                                                <tr>
                                                    <th>Time Period:</th>
                                                    <td>&nbsp;{data.timePeriod}</td>
                                                </tr>
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={classes.roundDiv}>
                                    <h3 className={classes.innerHead}>More details</h3>
                                    <Divider style={{ margin: 0 }} />
                                    <table style={{ textAlign: "left" }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ verticalAlign: "text-top" }}>Descriptions:</th>
                                                <td>&nbsp;{data.description}</td>
                                            </tr>
                                            <br />
                                            <tr>
                                                <th style={{ verticalAlign: "text-top" }}>Address:</th>
                                                <td>&nbsp;{data.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            : "Loading....."}
                    </Paper>
                }
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

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(SeeMore)));
