import React from 'react';
import Group from './group.js';

export default class Col extends React.Component {
    render(){
        let groups = [];
        this.props.groups.forEach((value, key) => {
            let c = key % 2 !== 0 ? "line-to-right-down" : "line-to-right-up";
            groups.push(<Group className={c} />);
        })
        return(
            <div>{groups}</div>
        );
    }
}
