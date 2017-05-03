import React from 'react'
import { Link, IndexLink } from 'react-router'
import NavLink from './navLink'

export default class App extends React.Component{
	render(){
		return (
			<div>
				<h1>React Router Tutorial</h1>
				<ul role="nav">
					<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
					{/*<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>*/}
					<li><NavLink to="/about">About</NavLink></li>
					<li><NavLink to="/repos">Repos</NavLink></li>
				</ul>
				{this.props.children}
			</div>
		)
	}
}

