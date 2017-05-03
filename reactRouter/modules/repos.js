import React from 'react'
import NavLink from './navLink'
//import {browserHistory} from 'react-router'

export default class Repos extends React.Component{
		
	constructor(){
		super();
		this.contextTypes = {
			router: React.PropTypes.object
		}	
	}

	handleSubmit(event){
		event.preventDefault()
		const userName = event.target.elements[0].value
		const repo = event.target.elements[1].value
		const path = `/repos/${userName}/${repo}`
		console.log(path)
		//browserHistory.push(path)
		console.log(this)
		this.context.router.push(path)
	}

	render(){
		return (
			<div>
				<h2>Repos</h2>
				<ul>
					<li><NavLink to="/repos/reactjs/react-router">react router</NavLink></li>
					<li><NavLink to="/repos/facebook/react">react</NavLink></li>
					<li>
						<form onSubmit={this.handleSubmit}>
							<input type="text" placeholder="userName" />{' '}
							<input type="text" placeholder="repo" />{''}
							<button type="submit">GO</button>
						</form>
					</li>
				</ul>
				{this.props.children}
			</div>
		)
	}
}