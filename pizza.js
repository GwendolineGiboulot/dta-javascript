import { RecipeService } from "./recipes";
import { PizzaBdd } from "./pizzabdd";

let recipeService = new RecipeService();
let pizzaBdd = new PizzaBdd();

export class PizzaService {
    constructor() {

        this.pizzaCounter = 0;
        this.score = 0;
    }


    temps(score){

    	return 6000 + 5000*(1 - Math.exp(score*0.1));
    }


    open(cb) {
    	this.speed = 5000;
        pizzaBdd.deleteAllPizza();

        this.x = () => {
            recipeService
                .getRandomRecipe()
                .then(recipe => ({ recipe: recipe.name, toppings: [] }))
                .then(pizza => pizzaBdd.addPizza(pizza))
                .then(pizza => {
                    if (this.pizzaCounter > 9) {
                        clearInterval(interval);
                        alert(
                            "TU AS FAIT " + this.score + " POINTS !! WOUHOU !"
                        );
                    }
                    this.speedUp();
                    this.pizzaCounter++;

                    return pizza;
                })
                .then(cb);
        };

        this.interval = setInterval(this.x,  6000);
    }

    speedUp() {
        clearInterval(this.interval);
        this.speed = this.temps(this.score);
        console.log(this.speed);
        this.interval = setInterval(this.x, this.speed);
    }

    // TOOLS

    getStatus(p1, listeRecipe) {
        let recette = listeRecipe.find(recipe => p1.recipe === recipe.name);

        let { ok, ko } = recette.toppings.reduce(
            (acc, item, idx, arr) => {
                let first = p1.toppings.indexOf(item);
                let last = p1.toppings.lastIndexOf(item);

                if (first !== -1 && first === last) acc.ok++;
                else acc.ko++;
                return acc;
            },
            { ok: 0, ko: 0 }
        );

        if (ok < p1.toppings.length) return "wrong";
        else if (ko > 0) return "incomplete";
        else return "complete";
    }

    findIncomplete(listePizza) {
        let nbIncomplete = 0;

        listePizza.forEach(val => {
            if (getStatus(val) === "incomplete") nbIncomplete++;
        });
        return nbIncomplete;
    }

    findWrong(listePizza) {
        let nbIncomplete = 0;

        listePizza.forEach(val => {
            if (getStatus(val) === "wrong") nbIncomplete++;
        });
        return nbIncomplete;
    }

    findComplete(listePizza) {
        let nbIncomplete = 0;

        listePizza.forEach(val => {
            if (getStatus(val) === "complete") nbIncomplete++;
        });
        return nbIncomplete;
    }
}
