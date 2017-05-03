import React from 'react';
import Col from './col.js';

import Players from './players.js';

class Grid extends React.Component{
	constructor(){
		super(); 
		this.state = {
			players : new Players
		}
	}

	render(){
		let cols = [];
		if(this.state.players.players.length === 0){
			cols.push(<h3>对阵表为生成</h3>);
		}else{
			this.state.players.players.forEach((value, key) => {
				cols.push(<Col name={"grid-row-"+ (key+1)} groups={value}/>);
			})
		}
		return(
			<div ref="grid">{cols}</div>
		);
	}
}
React.render(<Grid />, document.getElementById("grid")); 