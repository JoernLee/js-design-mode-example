/**
 * 菜单程序例子
 */
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

// 定义setCommand函数 - 负责安装命令 - 封装不变的部分
var setCommand = function(button, command){
    button.onclick = function(){
        command.execute();
    }
}

// 负责编写按钮点击逻辑的程序员实现逻辑功能
var MenuBar = {
    refresh: function(){
        console.log('刷新菜单目录');
    }
}

var SubMenu = {
    add: function(){
        console.log('增加子菜单');
    },
    delete: function(){
        console.log('删除子菜单');
    }
}

// 封装行为到命令类中
var RefreshMenuBarCommnad = function(receiver){
    this.receiver = receiver;
}

var AddSubMenuBarCommnad = function(receiver){
    this.receiver = receiver;
}

var DeleteSubMenuBarCommnad = function(receiver){
    this.receiver = receiver;
}

RefreshMenuBarCommnad.prototype.execute = function(){
    this.receiver.refresh();
}

AddSubMenuBarCommnad.prototype.execute = function(){
    this.receiver.add();
}

DeleteSubMenuBarCommnad.prototype.execute = function(){
    this.receiver.delete();
}

// 把命令接收者传入command对象，并且安装command到button上
var refreshMenuBarCommnad = new RefreshMenuBarCommnad(MenuBar);
var addSubMenuBarCommnad = new AddSubMenuBarCommnad(SubMenu);
var deleteSubMenuBarCommnad = new DeleteSubMenuBarCommnad(SubMenu);

setCommand(button1, refreshMenuBarCommnad);
setCommand(button2, addSubMenuBarCommnad);
setCommand(button3, deleteSubMenuBarCommnad);

/**
 * 简单的实现
 */

var bindClick = function(button,func){
    button.onclick = func;
}

var MenuBar = {
    refresh: function(){
        console.log('刷新')
    }
}

var SubMenu = {
    add: function(){},
    delete: function(){}
}

bindClick(button1, MenuBar.refresh);
bindClick(button2, SubMenu.add);

/**
 * 基于闭包的实现
 */
var setCommand = function(button,command){
    button.onclick = function(){
        command.execute();
    }
}

var MenuBar = {
    refresh: function(){
        console.log('刷新')
    }
}

var RefreshMenuBarCommnad = function(receiver){
    return {
        execute: function(){
            receiver.refresh();
        }
    }
}

var refreshMenuBarCommnad = RefreshMenuBarCommnad(MenuBar);
setCommand(button1, refreshMenuBarCommnad);

/**
 * 小球移动Demo
 */

var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');

moveBtn.onclick = function(){
    var animate = new Animate(ball);
    animate.start('left',pos.value, 1000, 'strongEaseOut');
}

/**
 * 命令模式+撤销
 */
 var ball = document.getElementById('ball');
 var pos = document.getElementById('pos');
 var moveBtn = document.getElementById('moveBtn');
 var cancelBtn = document.getElementById('cancelBtn');

 var MoveCommand = function(receiver, pos){
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
 }

 MoveCommand.prototype.execute = function(){
    this.receiver.start('left',this.pos, 1000, 'strongEaseOut');
    this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
 }

 MoveCommand.prototype.undo = function(){
    this.receiver.start('left',this.oldPos, 1000, 'strongEaseOut');
 }

 var moveCommand;

 moveBtn.onclick = function(){
    var animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
 }

 cancelBtn.onclick = function(){
    moveCommand.undo();
 }