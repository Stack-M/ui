import React from 'react';
import {LineChart, XAxis, YAxis, Line, ResponsiveContainer} from 'recharts';

export default function ScoreDistributionGraph(props) {
    return (
        <ResponsiveContainer width="100%" height={330}>
            <LineChart data={props.data}>
                <XAxis dataKey="score"
                axisLine={{ stroke: "white" }}
                tick={{ fill: "white" }}
                tickLine={{ fill: "white" }} />
                <Line dataKey="amount" type="monotone" stroke="#03a9f4" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
};