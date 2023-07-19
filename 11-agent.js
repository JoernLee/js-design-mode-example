/**
 * 泡泡堂的例子
 */
// 保存所有玩家
const players = [];

// 定义玩家
class Player {
    constructor(name, teamColor) {
        this.name = name;
        this.partners = [];
        this.enemies = [];
        this.state = 'live';
        this.teamColor = teamColor;
    }

    win() {
        console.log(this.name + 'win');
    }

    lose() {
        console.log(this.name + 'lose');
    }

    die() {
        // 需要遍历其他队友情况，判断队伍获胜
        let all_dead = true;
        this.state = 'dead';
        for (let partner in this.partners) {
            if (partner.state !== 'dead') {
                all_dead = false;
                break;
            }
        }
        if (all_dead) {
            this.lose();
            for (let partner in this.partners) {
                partner.lose();
            }
            for (let enemy in this.enemies) {
                enemy.win();
            }
        }
    }
}

const playerFactor = function (name, teamColor) {
    // 定义工厂方法
    const newPlayer = new Player(name, teamColor);
    for (let player in players) {
        if (player.teamColor === newPlayer.teamColor) {
            player.partners.push(newPlayer);
            newPlayer.partners.push(player);
        } else {
            player.enemies.push(newPlayer);
            newPlayer.enemies.push(player);
        }
    }
    players.push(newPlayer);

    return newPlayer;
}

let player1 = playerFactor('玩家1', 'red');
let player2 = playerFactor('玩家2', 'red');
let player3 = playerFactor('玩家3', 'blue');
let player4 = playerFactor('玩家4', 'blue');


player1.die();
player2.die();

/**
 * 引入中介模式
 */
// Player无需关注其他Player
class Player {
    constructor(name, teamColor) {
        this.name = name;
        this.state = 'live';
        this.teamColor = teamColor;
    }

    win() {
        console.log(this.name + 'win');
    }

    lose() {
        console.log(this.name + 'lose');
    }

    die() {
        this.state = 'dead';
        // 通知中介者-玩家死亡
        playerDirector.ReceiveMessage('playerDead', this);
    }

    remove() {
        playerDirector.ReceiveMessage('removePlayer', this);
    }
}

const playerFactor2 = function (name, teamColor) {
    // 这里工厂只需要当个壳子
    const newPlayer = new Player(name, teamColor);
    playerDirector.ReceiveMessage('addPlayer', newPlayer);

    return newPlayer;
}

// 实现中介者 - 两种实现本质上没区别 - demo是第二种
// 1. 通过发布-订阅模式。Director为订阅者，各Player发布者
// 2. 在playerDirctor中开放一些接收消息的接口，player主动向director发送消息，director收到之后会进行处理并通过引用的其他player对象进行反馈
