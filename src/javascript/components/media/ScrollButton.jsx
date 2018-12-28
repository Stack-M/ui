import React from 'react';
import { Button } from '@material-ui/core';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import RightArrow from '@material-ui/icons/KeyboardArrowRight';

export default class ScrollButton extends React.Component {
    get icon() {
        if(this.props.left) {
            return <LeftArrow />;
        }
        if(this.props.right) {
            return <RightArrow />;
        }
    }

    render() {
        return (
            <div className={`scroll-button-container ${this.props.left ? 'left' : 'right'}`} onClick={this.props.onClick}>
                <Button variant="fab">
                    {this.icon}
                </Button>
            </div>
        );
    }
}