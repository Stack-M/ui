import React from 'react';
import pink from '@material-ui/core/colors/pink';
import FolderIcon from '@material-ui/icons/Folder';

export default function Node(props) {
    return (
        <section className="node" onClick={props.clickHandler}>
            <section className="icon" style={{ background: pink[500] }}>
                <FolderIcon />
            </section>
            <section className="text">
                {props.text}
            </section>
        </section>
    )
}