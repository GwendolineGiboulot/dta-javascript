
import { uniq } from 'lodash';

let cacheRecipes;

export class RecipeService {


	getToppings(){

		return this.getRecipes()
		.then(this._extractToppings);


	}



	getRandomRecipe(){

		return this.getRecipes()
		.then(recipes => recipes[Math.floor(Math.random()*recipes.length)]);

	}



	getRecipes(){

		if(cacheRecipes)
		{
			return Promise.resolve(cacheRecipes);
		}
		else
		{

			return fetch('http://10.1.0.136:3000/recipes')
			.then(response => response.json())
			.then(recipes => {

				cacheRecipes = recipes;
				return recipes;

			});

		}

	}


	_extractToppings(recipes){

		return (uniq(recipes.reduce((toppings, recipe) => {

			return [...toppings,...recipe.toppings]

		},[])));

	}





}