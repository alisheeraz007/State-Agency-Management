import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase';
import Header from '../header';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { getData } from '../../actions/action';
import { Divider, Input, Icon, Tooltip, Button, Select, message } from 'antd';

const success = (a) => {
    message.success(a);
};

const errorr = (a) => {
    message.error(a);
};

const styles = theme => ({
    form: {
        padding: 5,
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            overflowY: "scroll",
            width: "90%",
            height: "75vh",
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%,-65%)",
            // display: "block"
        },
        [theme.breakpoints.up('sm')]: {
            width: "60%",
            overflowY: "scroll",
            height: "82vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "block"
        },
        [theme.breakpoints.up('md')]: {
            width: "60%",
            overflowY: "scroll",
            height: "82vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "block"
        },
    },
    formm: {
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            width: "70%"
        },
        [theme.breakpoints.up('lg')]: {
            width: "70%"
        },
    }
});

class AddData extends Component {
    constructor() {
        super()
        this.state = {
            Loading: false,
            data: null,
            ownerName: "",
            ownerNumber: "",
            category: "",
            rentOrOwnership: "",
            floor: "",
            bathrooms: "",
            bedrooms: "",
            finalPrice: "",
            advance: "",
            timePeriod: "",
            description: "",
            address: "",
            demandingPrice: ""
        }
    }

    gettingValues = (name, ev) => {
        if (name === "category" || name === "rentOrOwnership") {
            this.setState({
                [name]: ev
            })
        } else {
            this.setState({
                [name]: ev.target.value
            })
        }
    }

    makingLength_2 = (value, miliseconds) => {
        if (miliseconds === "miliseconds") {
            value = value.toString()
            let correctValue = value.length === 1 ? "00" + value : value.length === 2 ? "0" + value : value
            // console.log(correctValue)
            return correctValue

        } else {

            value = value.toString()
            let correctValue = value.length === 1 ? "0" + value : value
            // console.log(correctValue)
            return correctValue
        }
    }

    entryNo = () => {
        let d = new Date()
        let year = d.getFullYear()
        let month = this.makingLength_2(d.getMonth() + 1)
        let date = this.makingLength_2(d.getDate())
        let hours = this.makingLength_2(d.getHours())
        let mintues = this.makingLength_2(d.getMinutes())
        let seconds = this.makingLength_2(d.getSeconds())
        let miliSeconds = this.makingLength_2(d.getMilliseconds(), "miliseconds")
        let entryNo = year.toString() + month.toString() + date.toString() + hours.toString() + mintues.toString() + seconds.toString() + miliSeconds.toString()
        // console.log(entryNo)
        return entryNo

    }

    add = (ev) => {
        ev.preventDefault();
        this.setState({
            Loading: true
        })
        let obj = {
            ownerName: this.state.ownerName,
            ownerNumber: this.state.ownerNumber,
            category: this.state.category,
            rentOrOwnership: this.state.rentOrOwnership,
            floor: this.state.floor,
            bathrooms: this.state.bathrooms,
            bedrooms: this.state.bedrooms,
            finalPrice: this.state.finalPrice,
            advance: this.state.advance,
            timePeriod: this.state.timePeriod,
            description: this.state.description,
            address: this.state.address,
            demandingPrice: this.state.demandingPrice,
            entryNo: this.entryNo()
        }
        firebase.database().ref("wholeData").child(this.props.state.personalInfo.uid)
            .child("added").child(obj.entryNo).update(obj)
            .then((res) => {
                this.setState({
                    Loading: false,
                    ownerName: "",
                    ownerNumber: "",
                    category: "",
                    rentOrOwnership: "",
                    floor: "",
                    bathrooms: "",
                    bedrooms: "",
                    finalPrice: "",
                    advance: "",
                    timePeriod: "",
                    description: "",
                    address: "",
                    demandingPrice: ""
                })
                success("Successfully Added")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                errorr(errorMessage)
            });
    }

    render() {
        const { classes } = this.props;
        const { Option } = Select;
        const { TextArea } = Input;
        return (
            <>
                <Header login="true" add={true} />
                <Paper id="scrollNone" className={classes.form}>
                    <h1>Add flat details</h1>
                    <Divider />
                    <form className={classes.formm}>
                        <div>
                            <Input
                                style={{ width: "47%", display: "inline-block" }}
                                value={this.state.ownerName}
                                onChange={(ev) => this.gettingValues("ownerName", ev)}
                                size="large"
                                placeholder="Owner name"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={
                                    <Tooltip title="Name of owner">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                required
                            />
                            &nbsp;	&nbsp;
                            <Input
                                type="number"
                                style={{ width: "47%", display: "inline-block" }}
                                value={this.state.ownerNumber}
                                onChange={(ev) => this.gettingValues("ownerNumber", ev)}
                                size="large"
                                placeholder="Owner number"
                                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={
                                    <Tooltip title="Number of owner">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                required
                            />
                            <br />
                            <br />
                            <Select
                                style={{ width: "96%", display: "inline-block" }}
                                size="large"
                                showSearch
                                placeholder="Choose a category"
                                optionFilterProp="children"
                                onChange={(ev) => this.gettingValues("category", ev)}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Houses">Houses</Option>
                                <Option value="Appartments-And-Flats">Appartments & Flats</Option>
                                <Option value="Portions-And-Floor">Portions & Floor</Option>
                                <Option value="Shops-Offices-CommercialSpace">Shops - Offices - Commercial Space</Option>
                                <Option value="Land-And-Plots">Land & Plots</Option>
                            </Select>
                            <br />
                            <br />
                            {this.state.category !== "Land-And-Plots" ?
                                <>
                                    <Input
                                        type="number"
                                        style={{ width: "96%", display: "inline-block" }}
                                        value={this.state.floor}
                                        onChange={(ev) => this.gettingValues("floor", ev)}
                                        size="large"
                                        placeholder="Floor"
                                        prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={
                                            <Tooltip title="floor number ?">
                                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                            </Tooltip>
                                        }
                                        required
                                    />
                                    <br />
                                    <br />
                                </>
                                : null}
                            {this.state.category === "Shops-Offices-CommercialSpace" && this.state.category !== "Land-And-Plots" ?
                                <>
                                    <Input
                                        type="number"
                                        style={{ width: "96%", display: "inline-block" }}
                                        value={this.state.bathrooms}
                                        onChange={(ev) => this.gettingValues("bathrooms", ev)}
                                        size="large"
                                        placeholder="Bathrooms"
                                        prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={
                                            <Tooltip title="Number of bathrooms ?">
                                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                            </Tooltip>
                                        }
                                        required
                                    />
                                    <br />
                                    <br />
                                </>
                                :
                                this.state.category !== "Land-And-Plots" ?
                                    <>
                                        <Input
                                            type="number"
                                            style={{ width: "47%", display: "inline-block" }}
                                            value={this.state.bathrooms}
                                            onChange={(ev) => this.gettingValues("bathrooms", ev)}
                                            size="large"
                                            placeholder="Bathrooms"
                                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            suffix={
                                                <Tooltip title="Number of bathrooms ?">
                                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                            required
                                        />
                                        &nbsp;	&nbsp;
                                    <Input
                                            type="number"
                                            style={{ width: "47%", display: "inline-block" }}
                                            value={this.state.bedrooms}
                                            onChange={(ev) => this.gettingValues("bedrooms", ev)}
                                            size="large"
                                            placeholder="Bedrooms"
                                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            suffix={
                                                <Tooltip title="Number of bedrooms ?">
                                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                            required
                                        />
                                        <br />
                                        <br />
                                    </>
                                    : null
                            }
                            <Select
                                size="large"
                                style={{ width: "47%", display: "inline-block" }}
                                showSearch
                                placeholder="Rent Or Ownership ?"
                                onChange={(ev) => this.gettingValues("rentOrOwnership", ev)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Rent">Rent</Option>
                                <Option value="Ownership">Ownership</Option>
                            </Select>
                            &nbsp;	&nbsp;
                            <Input
                                type="number"
                                style={{ width: "47%", display: "inline-block" }}
                                value={this.state.finalPrice}
                                onChange={(ev) => this.gettingValues("finalPrice", ev)}
                                size="large"
                                placeholder="Final Price"
                                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={
                                    <Tooltip title="FInal price of giving">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                required
                            />
                            <br />
                            <br />
                            <Input
                                type="number"
                                style={{ width: "96%", display: "inline-block" }}
                                value={this.state.demandingPrice}
                                onChange={(ev) => this.gettingValues("demandingPrice", ev)}
                                size="large"
                                placeholder="Demanding Price"
                                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={
                                    <Tooltip title="First price to tell customer">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                                required
                            />
                            <br />
                            <br />
                            {this.state.rentOrOwnership === "Rent" ?
                                <>
                                    <Input
                                        type="number"
                                        style={{ width: "47%", display: "inline-block" }}
                                        value={this.state.advance}
                                        onChange={(ev) => this.gettingValues("advance", ev)}
                                        size="large"
                                        placeholder="Advance amount"
                                        prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={
                                            <Tooltip title="Amount of advance">
                                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                            </Tooltip>
                                        }
                                        required
                                    />
                                    &nbsp;	&nbsp;
                                <Input
                                        style={{ width: "47%", display: "inline-block" }}
                                        value={this.state.timePeriod}
                                        onChange={(ev) => this.gettingValues("timePeriod", ev)}
                                        size="large"
                                        placeholder="Time period"
                                        prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        suffix={
                                            <Tooltip title="Time period for living">
                                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                            </Tooltip>
                                        }
                                        required
                                    />
                                    <br />
                                    <br />
                                </>
                                : null}
                            <TextArea
                                style={{ width: "96%", display: "inline-block" }}
                                value={this.state.description}
                                onChange={(ev) => this.gettingValues("description", ev)}
                                placeholder="Few descriptions"
                                autosize={{ minRows: 3, maxRows: 5 }}
                            />
                            <br />
                            <TextArea
                                style={{ width: "96%", display: "inline-block" }}
                                value={this.state.address}
                                onChange={(ev) => this.gettingValues("address", ev)}
                                placeholder="Full adress"
                                autosize={{ minRows: 3, maxRows: 5 }}
                            />
                            <br />
                            <br />
                            <Button
                                style={{ float: "right", background: "black", borderColor: "black", width: 100 }}
                                type="primary"
                                loading={this.state.Loading}
                                onClick={(ev) => this.add(ev)}
                            >
                                Add
        </Button>
                            <br />
                            <br />
                        </div>
                    </form>
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

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(AddData)));
