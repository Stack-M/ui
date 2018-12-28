import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

export default function NoLibraryDisplay(props) {
    return (
        <section className="no-libraries">
            No libraries setup at this moment
            <br />
            <br />
            <Button component={Link} to="/setup" variant="extendedFab" color="primary"><AddIcon style={{ marginRight: '.2rem' }} /> Setup one now</Button>
        </section>
    )
}