import React from 'react';
import { NoProcesses } from './NoProcesses';

export default class CurrentProcessesDisplay extends React.Component {
    render() {
        return (
            <section className="current-processes-display">
                <NoProcesses />
            </section>
        )
    }
}