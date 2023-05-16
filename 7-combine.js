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

/**
 * 组合模式实现扫描文件夹
 */
// 定义Folder与File类
class Folder {
    constructor(name) {
        this.name = name;
        this.files = [];
    }
    add(file) {
        this.files.push(file);
    }
    scan() {
        for (let i = 0, file, files = this.files; files = files[i++];) {
            file.scan();
        }
    }
}

class File {
    constructor(name) {
        this.name = name;
    }
    add(file) {
        throw new Error('文件下面不能添加文件')
    }
    scan() {
        for (let i = 0, file, files = this.files; files = files[i++];) {
            file.scan();
        }
    }
}

// 创建实例，组合
const folder = new Folder('学习资料');
const folder1 = new Folder('JS');

const file1 = new File('JS设计模式');
const file2 = new File('精通Jquery');

// 用户操作对象，无需分辨是文件还是文件夹，很容易添加到整个组合树中 --- 符合开闭原则
folder1.add(file1);
folder1.add(file2);
folder.add(folder1);

// 扫描操作也很简单
folder.scan()