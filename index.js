import { RecipeService } from "./recipes";
import { PizzaService } from "./pizza";
import { PizzaBdd } from "./pizzabdd";
import { shuffle } from "lodash";

let recipeService = new RecipeService();
let pizzaService = new PizzaService();
let pizzaBdd = new PizzaBdd();

let toppingsUl = document.getElementById("toppings");
let commandsUl = document.getElementById("commands");
let nomPizza = document.getElementById("pizzas");
let pizzaToppingsUl = document.getElementById("inserted-toppings");

let h = document.createElement.bind(document);

let listeRecipe = recipeService.getRecipes();

let button = document.getElementById("validPizza");

let pizzaCourrante;


recipeService
    .getToppings()
    .then(listeToppings => shuffle(listeToppings))
    .then(toppings =>
        toppings.forEach(topping => {
            let li = h("li");
            li.innerHTML = topping;
            toppingsUl.appendChild(li);
            li.style.cursor = "pointer";
            li.classList.add("list-group-item");
        }));

pizzaService.open(pizza => {
    let li = h("li");
    li.innerHTML = pizza.recipe + "  " + pizza.toppings.length;

    li.setAttribute("pizza-id", pizza.id);

    commandsUl.appendChild(li);
    li.style.cursor = "pointer";
    li.classList.add("list-group-item");
});

toppingsUl.addEventListener(
    "click",
    event => {
        if (!pizzaCourrante) alert("SELECTIONNE UNE PIZZA, SINON ...");

        if (event.target && event.target.nodeName === "LI" && pizzaCourrante) {
            let topping = event.target.innerText;
            let li = h("li");
            li.innerHTML = event.target.innerHTML;
            pizzaToppingsUl.appendChild(li);
            pizzaCourrante.toppings.push(topping);
            pizzaBdd.updatePizza(pizzaCourrante.id, pizzaCourrante);
        }
    },
    false
);

function validatePizza() {
    listeRecipe.then(r => {
        let status = pizzaService.getStatus(pizzaCourrante, r);
        if (status === "wrong") {
            let id = pizzaCourrante.id;
            let el = commandsUl.querySelector(`[pizza-id="${id}"]`);

            el.style.background = "red";
        }
        if (status === "complete") {
            let id = pizzaCourrante.id;
            let el = commandsUl.querySelector(`[pizza-id="${id}"]`);
            el.remove();
            pizzaBdd.deletePizza(pizzaCourrante.id);
            pizzaService.pizzaCounter--;

            pizzaService.score++;
        }
        if (status === "incomplete") {


            let id = pizzaCourrante.id;
            let el = commandsUl.querySelector(`[pizza-id="${id}"]`);
            el.innerHTML = pizzaCourrante.recipe + "  " + pizzaCourrante.toppings.length;

        }
    });
}

button.addEventListener("click", validatePizza, false);

commandsUl.addEventListener(
    "click",
    event => {
        if (event.target && event.target.nodeName === "LI") {
            let pizzaId = event.target.getAttribute("pizza-id");
            pizzaBdd.getPizza(pizzaId).then(pizza => selectPizza(pizza));
        }
    },
    false
);

function selectPizza(pizza) {
    if (!pizza) return;
    pizzaCourrante = pizza;

    pizzaToppingsUl.innerHTML = "";

    pizza.toppings.forEach(topping => {
        let li = h("li");
        li.innerHTML = topping;
        pizzaToppingsUl.appendChild(li);
    });

    nomPizza.innerText = pizza.recipe || "Sélectionnez une pizza";
}
