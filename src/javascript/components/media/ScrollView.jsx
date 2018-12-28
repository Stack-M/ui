import React from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import ScrollButton from './ScrollButton';

@observer
export default class ScrollView extends React.Component {
    @observable viewRef = React.createRef();
    @observable scrollOffset = 0;
    @observable scrollWidth = 0;

    componentDidUpdate(prevProps) {
        if(prevProps.children !== this.props.children) {
            this.scrollWidth = this.viewRef.current.scrollWidth;
        }
    }

    componentDidMount() {
        this.scrollWidth = this.viewRef.current.scrollWidth;
    }

    @computed get leftScrollButton() {
        if(!this.viewRef.current) return;

        if(this.scrollOffset <= 0 || this.scrollWidth <= this.viewRef.current.clientWidth) {
            return null;
        }

        return <ScrollButton left onClick={(ev) => this.handleLeftScroll(ev)} />;
    }

    @computed get rightScrollButton() {
        if(!this.viewRef.current) return;

        const maxScroll = this.viewRef.current.scrollWidth - this.viewRef.current.clientWidth + (this.viewRef.current.clientWidth / 2);

        if(this.scrollOffset >= maxScroll || this.scrollWidth <= this.viewRef.current.clientWidth) {
            return null;
        }

        return <ScrollButton right onClick={(ev) => this.handleRightScroll(ev)}/>;
    }

    handleLeftScroll(event) {
        this.viewRef.current.scrollLeft -= this.viewRef.current.clientWidth / 2;
        this.scrollOffset -= this.viewRef.current.clientWidth / 2;
    }

    handleRightScroll(event) {
        this.viewRef.current.scrollLeft += this.viewRef.current.clientWidth / 2;
        this.scrollOffset += this.viewRef.current.clientWidth / 2;
    }

    render() {
        return (
            <section className="scroll-view" style={this.props.height ? { height: `calc(${this.props.height}px)` } : {}}>
                {this.leftScrollButton}
                <div className="container" ref={this.viewRef}>{this.props.children}</div>
                {this.rightScrollButton}
            </section>
        );
    }
}