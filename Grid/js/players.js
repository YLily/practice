class player{
	constructor(item){
        if(item){
           this.info = {};
           this.info.name = item.username || '';
           this.info.id = item.user_id || '';
           this.info.score = item.score || '';
           this.info.state = item.play_state || ''; 
        }
	}
}

export default class Players {
	constructor(){
        let totalNum = 4, match_id = 4;
        let n = Math.ceil(Math.log(totalNum)/Math.LN2);//得到比赛总轮次
        let players = [];
        for(let i = n, index = 0; i > 0; i--, index++){
            let groupNum = Math.pow(2,i)/2;  //每轮group数
            let round = [];
            for(let j = 0; j< groupNum; j++){       
                round.push({"match_id": match_id, "promotion_state": index, "group_id": j+1, "playerA": new player({}), "playerB": new player({})});
            }
            players.push(round);  
        }

        data.play.forEach((value, key) => {
            if(key > 0){
                if(value.group_id === data.play[key-1].group_id){
                    players[value.promtion_state][value.group_id-1].playerB = new player(value);
                }else{
                    players[value.promtion_state][value.group_id-1].playerA = new player(value);
                }
            }else{
               players[value.promtion_state][value.group_id-1].playerA = new player(value); 
            }
        })
        this.players = players;
	}
}

var data ={
        "play":[
            {
                "select":false,
                "disable":false,
                "user_logo":"",
                "rolename":"",
                "id":1845,
                "user_id":33,
                "username":"shako222",
                "match_id":48,
                "group_id":1,
                "promtion_state":0,
                "play_state":7,
                "score":1,
                "sort":2,
                "winner":1,
                "ranking":2,
                "match_type":"BO3",
                "card_screenshot_1":"",
                "card_screenshot_2":"",
                "play_screenshot_1":"",
                "play_screenshot_2":"",
                "play_screenshot_3":"",
                "play_screenshot_4":"",
                "play_screenshot_5":"",
                "addtime":"2016/11/25 18:29:00"
            },
            {
                "select":false,
                "disable":false,
                "user_logo":"",
                "rolename":"",
                "id":1846,
                "user_id":0,
                "username":"轮空",
                "match_id":48,
                "group_id":1,
                "promtion_state":0,
                "play_state":7,
                "score":0,
                "sort":2,
                "winner":0,
                "ranking":2,
                "match_type":"BO3",
                "card_screenshot_1":"",
                "card_screenshot_2":"",
                "play_screenshot_1":"",
                "play_screenshot_2":"",
                "play_screenshot_3":"",
                "play_screenshot_4":"",
                "play_screenshot_5":"",
                "addtime":"2016/11/25 18:29:00"
            },
            {
                "select":false,
                "disable":false,
                "user_logo":"",
                "rolename":"",
                "id":1847,
                "user_id":2,
                "username":"彬彬",
                "match_id":48,
                "group_id":2,
                "promtion_state":0,
                "play_state":7,
                "score":1,
                "sort":1,
                "winner":0,
                "ranking":2,
                "match_type":"BO3",
                "card_screenshot_1":"",
                "card_screenshot_2":"",
                "play_screenshot_1":"",
                "play_screenshot_2":"",
                "play_screenshot_3":"",
                "play_screenshot_4":"",
                "play_screenshot_5":"",
                "addtime":"2016/11/25 18:29:00"
            },
            {
                "select":false,
                "disable":false,
                "user_logo":"",
                "rolename":"",
                "id":1848,
                "user_id":36,
                "username":"少糖少奶",
                "match_id":48,
                "group_id":2,
                "promtion_state":0,
                "play_state":7,
                "score":2,
                "sort":1,
                "winner":1,
                "ranking":2,
                "match_type":"BO3",
                "card_screenshot_1":"",
                "card_screenshot_2":"",
                "play_screenshot_1":"",
                "play_screenshot_2":"",
                "play_screenshot_3":"",
                "play_screenshot_4":"",
                "play_screenshot_5":"",
                "addtime":"2016/11/25 18:29:00"
            },
            {
                "select":false,
                "disable":false,
                "user_logo":"",
                "rolename":"",
                "id":1849,
                "user_id":33,
                "username":"shako222",
                "match_id":48,
                "group_id":1,
                "promtion_state":1,
                "play_state":7,
                "score":0,
                "sort":0,
                "winner":0,
                "ranking":1,
                "match_type":"BO3",
                "card_screenshot_1":"",
                "card_screenshot_2":"",
                "play_screenshot_1":"",
                "play_screenshot_2":"",
                "play_screenshot_3":"",
                "play_screenshot_4":"",
                "play_screenshot_5":"",
                "addtime":"2016/11/25 18:29:00"
            },
            {
                "select":false,
                "disable":false,
                "user_logo":"",
                "rolename":"",
                "id":1850,
                "user_id":36,
                "username":"少糖少奶",
                "match_id":48,
                "group_id":1,
                "promtion_state":1,
                "play_state":7,
                "score":2,
                "sort":0,
                "winner":1,
                "ranking":0,
                "match_type":"BO3",
                "card_screenshot_1":"",
                "card_screenshot_2":"",
                "play_screenshot_1":"",
                "play_screenshot_2":"",
                "play_screenshot_3":"",
                "play_screenshot_4":"",
                "play_screenshot_5":"",
                "addtime":"2016/11/25 18:33:26"
            }
        ]
    }