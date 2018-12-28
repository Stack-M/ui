import React from 'react';

export default class ListView extends React.Component {
    render() {
        return (
            <section className="list-view">
                {this.props.children}
            </section>
        )
    }
}