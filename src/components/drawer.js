import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
});

class SideDrawer extends React.Component {
    constructor(props) {
        super(props)
    }

    push = (name) => {
        this.props.history.push(`/${name}`)
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Drawer className={classes.drawer} open={this.props.drawer} onClose={this.props.drawerClose}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.props.drawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>

                        <ListItem button onClick={(ev) => this.push("Add")}>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText primary="Add" />
                            <ListItemIcon style={{ opacity: 0 }}><AddBoxIcon /></ListItemIcon>
                        </ListItem>

                        <ListItem button onClick={(ev) => this.push("All")}>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText primary="All" />
                            <ListItemIcon style={{ opacity: 0 }}><AddBoxIcon /></ListItemIcon>
                        </ListItem>

                        <ListItem button onClick={(ev) => this.push("Rent")}>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText primary="Rent" />
                            <ListItemIcon style={{ opacity: 0 }}><AddBoxIcon /></ListItemIcon>
                        </ListItem>

                        <ListItem button onClick={(ev) => this.push("Ownership")}>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText primary="Ownership" />
                            <ListItemIcon style={{ opacity: 0 }}><AddBoxIcon /></ListItemIcon>
                        </ListItem>

                        <ListItem button onClick={(ev) => this.push("Sold")}>
                            <ListItemIcon><AddBoxIcon /></ListItemIcon>
                            <ListItemText primary="Sold" />
                            <ListItemIcon style={{ opacity: 0 }}><AddBoxIcon /></ListItemIcon>
                        </ListItem>

                    </List>
                </Drawer>
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

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(SideDrawer)));