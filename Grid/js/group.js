import React from 'react';

export default class Group extends React.Component {
    constructor(){
        super();
        this.state ={
            status : '',
            url : '',
            name: ''
        }
    }

    componentWillMount(){
        let stateA = this.props.group.playerA.info.state,
            stateB = this.props.group.playerB.info.state;
        let state, status = '';
        if(stateA && stateB){
           state = stateA - stateB < 0 ? stateA : stateB, status = '';
        }else if(stateA){
           state = stateA;
        }else if(stateB){
           state = stateB;
        }        

        switch(parseInt(state)){
            case 0: 
                status = "选手弃权比赛结束";
                break;
            case 1: 
                status = '等待比赛开始...';
                break;
            case 2: 
                status = '等待对手生成...';
                break;
            case 3: 
                status = '准备中...';
                break;
            case 4: 
                status = 'B/P中...';
                break;
            case 5: 
                status = '比赛进行中...';
                break;
            case 6: 
                status = '比赛产生争议...';
                break;
            case 7: 
                status = '比赛已结束...';
                break;
            default: break;
        }
        if(state === 7){
            this.setState({
                name : 'match-finished'
            })
        }
        if(status){
            this.setState({
                status : status,
                url : '/EventMatch/?Match_ID='+this.props.group.match_id+'&group_id='+this.props.group.group_id+'&promotion_state='+this.props.group.promotion_state
            })
        }else{
            this.setState({
               status : '',
               url : 'javascript:'
            }) 
        }       
    }
    componentDidMount(){
        let playerA = React.findDOMNode(this.refs.playerA),
            playerB = React.findDOMNode(this.refs.playerB);
        let scoreA = this.props.group.playerA.info.score,
            scoreB = this.props.group.playerB.info.score;
        scoreA - scoreB > 0 ? playerA.className = "player player-winner": playerB.className = "player player-winner";


    }
    
    render() {
        return ( 
            <div className = {"one-match "+this.props.name +' '+ this.state.name}>
                <div className="players">
                    <a className="player" ref="playerA" data-id = {this.props.group.playerA.info.id}>
                        <span className="player-name">{this.props.group.playerA.info.name}</span>
                        <span className="player-score">{this.props.group.playerA.info.score}</span>
                    </a>
                    <div className = "match-content"><a href={this.state.url}>{this.state.status}</a></div>
                    <a className="player" ref="playerB" data-id = {this.props.group.playerB.info.id}>
                        <span className="player-name">{this.props.group.playerB.info.name}</span>
                        <span className="player-score">{this.props.group.playerB.info.score}</span>
                    </a>
                </div>
            </div>
        );
    }
}
