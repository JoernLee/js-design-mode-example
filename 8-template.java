abstract class Beverage {
    // 模板方法，定义了烹饪流程
    public final void prepareBeverage() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    // 抽象方法，由子类实现具体的煮沸水的操作
    public abstract void boilWater();

    // 抽象方法，由子类实现具体的冲泡操作
    public abstract void brew();

    // 具体方法，通用的倒入杯子操作
    public void pourInCup() {
        System.out.println("Pouring beverage into cup");
    }

    // 抽象方法，由子类实现具体的加入调料的操作
    public abstract void addCondiments();
}

class Coffee extends Beverage {
    @Override
    public void boilWater() {
        System.out.println("Boiling water for coffee");
    }

    @Override
    public void brew() {
        System.out.println("Brewing coffee");
    }

    @Override
    public void addCondiments() {
        System.out.println("Adding milk and sugar to coffee");
    }
}

class Tea extends Beverage {
    @Override
    public void boilWater() {
        System.out.println("Boiling water for tea");
    }

    @Override
    public void brew() {
        System.out.println("Steeping tea leaves");
    }

    @Override
    public void addCondiments() {
        System.out.println("Adding lemon to tea");
    }
}

public class Main {
    public static void main(String[] args) {
        Beverage coffee = new Coffee();
        coffee.prepareBeverage();

        System.out.println("---------------------");

        Beverage tea = new Tea();
        tea.prepareBeverage();
    }
}
