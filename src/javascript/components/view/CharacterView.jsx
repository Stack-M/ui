import React from 'react';
import { Paper, Typography } from '@material-ui/core';

export class Character extends React.Component {
    render() {
        return (
            <Paper elevation={1} className="character">
                <section className="medium-char-image" style={{ backgroundImage: `url(${this.props.image.medium})` }} />
                <section className="details">
                    <Typography className="name">{this.props.name.first} {this.props.name.last} &middot; <span className="role">{this.props.role.toLowerCase()}</span></Typography>
                    <div className="native-name">{this.props.name.native}</div>
                </section>
            </Paper>
        );
    }
}

export default class CharacterView extends React.Component {
    render() {
        return (
            <section className="character-view">
                {this.props.characters.map(character => <Character key={character.node.name.first} {...character.node} role={character.role} />)}
            </section>
        );
    }
}