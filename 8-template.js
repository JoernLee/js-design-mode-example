/**
 * 模板方法模式第一个例子
 */
class Coffee {
    constructor(){};

    boilWater = () => {console.log('煮沸水')};

    brewCoffee = () => {console.log('冲泡咖啡')}

    addMilk = () => {console.log('加牛奶')}

    init = () => {
        this.boilWater();
        this.brewCoffee();
        this.addMilk();
    }
}

const coffee = new Coffee();
coffee.init();

class Tea {
    constructor(){};

    boilWater = () => {console.log('煮沸水')};

    steepTea = () => {console.log('冲泡茶')}

    addLemon = () => {console.log('加柠檬')}

    init = () => {
        this.boilWater();
        this.steepTea();
        this.addLemon();
    }
}

const tea = new Tea();
tea.init();

class Beverage {
    constructor(){};

    boilWater = () => {console.log('煮沸水')};

    brew = () => {}

    addCondiments = () => {}

    init = () => {
        this.boilWater();
        this.brew();
        this.addCondiments();
    }
}

class newCoffee extends Beverage {
    constructor(){};

    brew = () => {console.log('冲泡咖啡')}

    addCondiments = () => {console.log('加牛奶')}
}

const coffee2 = new newCoffee;
coffee2.init();

// newTea同理