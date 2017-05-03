import React from 'react';
import Group from './group.js';

export default class Col extends React.Component {       
    render(){
        let groups = [];
        if(this.props.groups.length === 1){
             groups.push(<Group group={this.props.groups[0]} />);
        }else{
            this.props.groups.forEach((value, key) => {
                let c = key % 2 === 0 ? "line-to-right-down" : "line-to-right-up";
                groups.push(<Group name={c} group={value}/>);
            })
        }
        return(
            <div className={"grid-round "+this.props.name}>{groups}</div>
        );
    }
}
