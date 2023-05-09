/**
  * 更强大宏命令
  */
 let closeDoorCommand = {
    execute: () => {
        console.log('关门');
    }
}

let openPCCommand = {
    execute: () => {
        console.log('打开电脑');
    }
}

let openQQCommand = {
    execute: () => {
        console.log('打开QQ');
    }
}

let openAcCommand = {
    execute: () => {
        console.log('开空调');
    }
}

let openTvCommand = {
    execute: () => {
        console.log('打开电视');
    }
}

let openSoundCommand = {
    execute: () => {
        console.log('打开音响');
    }
}

const MacroCommand = () => {
    return {
        commandsList: [],
        add: (command) => {
            this.commandsList.push(command);
        },
        execute: () => {
            for(let i = 0, command; command = this.commandsList[i++];){
                command.execute();
            }
        }
    }
}

const macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

const macroCommand2 = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPCCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();

const macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

// 给遥控器绑定超级命令
var setCommand = (function(command){
    document.getElementById('button').onclick = function(){
        command.execute();
    }
})(macroCommand)