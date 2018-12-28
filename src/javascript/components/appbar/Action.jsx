import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Action(props) {
    return (
        props.link
            ? (
                <Link className="action" to={props.to}>
                    <Button variant="fab">{props.icon}</Button>
                    <span className="name">{props.name}</span>
                </Link>
            ) : (
                <section className="action" onClick={props.onClick}>
                    <Button variant="fab">{props.icon}</Button>
                    <span className="name">{props.name}</span>
                </section>
            )
    )
}