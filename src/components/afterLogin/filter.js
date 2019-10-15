import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Select, Input, Icon, Tooltip } from 'antd';

const styles = theme => ({
    main: {
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
        [theme.breakpoints.up('sm')]: {
            display: "block"
        },
        [theme.breakpoints.up('md')]: {
            display: "block"
        },
    },
    appBar: {
        background: "black",
        position: "fixed",
        color: "white"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: "white"
    },
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
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClose = () => {
        this.props.handleClose()
    }

    render() {
        const { classes } = this.props;
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
        const { Option } = Select;
        return (
            <Dialog className={classes.main} fullScreen open={this.props.open} onClose={this.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Filter Form
            </Typography>
                        <Button color="inherit" onClick={this.props.filter}>
                            save
            </Button>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.form}>
                    <form>
                        <Select
                            style={{ width: "96%", display: "inline-block" }}
                            size="default"
                            showSearch
                            placeholder="Choose a category"
                            optionFilterProp="children"
                            onChange={(ev) => this.props.gettingValues("category", ev, Object.values(this.props.state.added))}
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
                        {/* <Select
                            style={{ width: "96%", display: "inline-block" }}
                            size="default"
                            showSearch
                            placeholder="Ownership or rent ?"
                            optionFilterProp="children"
                            onChange={(ev) => this.props.gettingValues("ownershipOrRent", ev, Object.values(this.props.state.added))}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Ownership">Ownership</Option>
                            <Option value="Rent">Rent</Option>
                        </Select>
                        <br />
                        <br /> */}
                        <Input
                            type="number"
                            style={{ width: "47%", display: "inline-block" }}
                            // value={this.state.ownerName}
                            onChange={(ev) => this.props.gettingValues("from", ev)}
                            size="default"
                            placeholder="From"
                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="From">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            required
                        />
                        &nbsp;	&nbsp;
                            <Input
                            type="number"
                            style={{ width: "47%", display: "inline-block" }}
                            // value={this.state.ownerNumber}
                            onChange={(ev) => this.props.gettingValues("to", ev)}
                            size="default"
                            placeholder="To"
                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="To">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            required
                        />
                        <br />
                        <br />
                        {/* <Input
                            type="number"
                            style={{ width: "47%", display: "inline-block" }}
                            // value={this.state.ownerName}
                            onChange={(ev) => this.props.gettingValues("bedrooms", ev)}
                            size="default"
                            placeholder="Bedrooms"
                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="No of bedrooms">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            required
                        />
                        &nbsp;	&nbsp;
                            <Input
                            type="number"
                            style={{ width: "47%", display: "inline-block" }}
                            // value={this.state.ownerNumber}
                            onChange={(ev) => this.props.gettingValues("to", ev)}
                            size="default"
                            placeholder="To"
                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="To">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            required
                        />
                        <br />
                        <br /> */}
                        <Button
                            style={{ float: "right", background: "black", borderColor: "black", width: 100, color: "white" }}
                            type="primary"
                            loading={this.state.Loading}
                            onClick={(ev) => this.props.filter(ev, Object.values(this.props.state.added), this.handleClose)}
                        >
                            Search
        </Button>
                    </form>
                </Paper>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const matchDispatchToProps = {}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(Filter)));
