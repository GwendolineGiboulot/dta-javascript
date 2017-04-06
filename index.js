import {RecipeService} from './recipes'
import {PizzaService} from './pizza'




let recipeService = new RecipeService;
let pizzaService = new PizzaService;

let toppingsUl = document.getElementById('toppings');
let commandsUl = document.getElementById('commands');


let h = document.createElement.bind(document);



recipeService.getToppings()
.then(toppings => toppings.forEach(topping => {

	let li = h('li');
	li.innerHTML = topping;
	toppingsUl.appendChild(li);
	li.classList.add('list-group-item');


}));


pizzaService.open(pizza => {

	let li = h('li');
	li.innerHTML = pizza.recipe;
	commandsUl.appendChild(li);
	li.classList.add('list-group-item');
})



