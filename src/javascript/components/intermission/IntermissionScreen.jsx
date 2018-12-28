import React from 'react';
import "../../../scss/intermission.scss";

export default function IntermissionScreen(props) {
    return (
        <section className="intermision-screen">
            <div className="message">{props.message}</div>
        </section>
    );
};