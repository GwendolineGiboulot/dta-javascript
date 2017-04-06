import { RecipeService } from './recipes';

let recipeService = new RecipeService;

export class PizzaService {


    open(cb) {
        setInterval(() => {
            recipeService.getRandomRecipe()
            .then(recipe => ({ recipe: recipe.name, toppings: [] }))
            .then(cb)
        }, 1000);
    }

}