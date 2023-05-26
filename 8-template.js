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

/**
 * JS实现抽象类
 */
 class Beverage {
    constructor() {
      if (new.target === Beverage) {
        throw new TypeError('Cannot instantiate abstract class');
      }
    }
  
    prepareBeverage() {
      this.boilWater();
      this.brew();
      this.pourInCup();
      this.addCondiments();
    }
  
    boilWater() {
      throw new Error('Abstract method not implemented');
    }
  
    brew() {
      throw new Error('Abstract method not implemented');
    }
  
    pourInCup() {
      console.log('Pouring beverage into cup');
    }
  
    addCondiments() {
      throw new Error('Abstract method not implemented');
    }
  }
  
  class Coffee extends Beverage {
    boilWater() {
      console.log('Boiling water for coffee');
    }
  
    brew() {
      console.log('Brewing coffee');
    }
  
    addCondiments() {
      console.log('Adding milk and sugar to coffee');
    }
  }
  
  class Tea extends Beverage {
    boilWater() {
      console.log('Boiling water for tea');
    }
  
    brew() {
      console.log('Steeping tea leaves');
    }
  
    addCondiments() {
      console.log('Adding lemon to tea');
    }
  }
  
  const coffee3 = new Coffee();
  coffee.prepareBeverage();
  
  console.log('---------------------');
  
  const tea3 = new Tea();
  tea.prepareBeverage();

/**
 * 带钩子方法
 */
class Beverage {
  constructor(){};

  boilWater = () => {console.log('煮沸水')};

  brew = () => {}

  addCondiments = () => {}

  customerWantsCondiments = () => {
    // 钩子方法 - 默认true
    return true
  }

  init = () => {
      this.boilWater();
      this.brew();
      if(this.customerWantsCondiments()){
        this.addCondiments();
      }
  }
}

class CoffeeWithHook extends Beverage {
  boilWater() {
    console.log('Boiling water for coffee');
  }

  brew() {
    console.log('Brewing coffee');
  }

  addCondiments() {
    console.log('Adding milk and sugar to coffee');
  }

  customerWantsCondiments (){
    return window.confirm('请问需要调料吗？');
  }
}

const coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();