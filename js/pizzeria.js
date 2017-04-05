let listeRecipe = [
{
	name : 'Regina',
	toppings :['fromage','jambon']

},
{
	name : '3 fromages',
	toppings :['fromage','fromage']

}
]

let p1 = {
	recipe : 'Regina',
	toppings : []
}

let p2 = {
	recipe : 'Regina',
	toppings : []
}


let l1 = {
	name : 'toto',
	toppings :['ananas','fromage']

}



// TOOLS 

let getStatus = function (p1) {

	let recette = listeRecipe.find(recipe => p1.recipe === recipe.name);
	
	let {ok,ko} = recette.toppings.reduce( (acc,item,idx,arr) => {

		let first = p1.toppings.indexOf(item);
		let last = p1.toppings.lastIndexOf(item)

		if( first !== -1 && first === last) acc.ok++;
		else acc.ko++;
		return acc;

	},{ok : 0, ko : 0});

	if (ok < p1.toppings.length) return 'wrong';
	else if (ko > 0) return 'incomplete';
	else return 'complete';

}

let findIncomplete = function (listePizza){

	let nbIncomplete = 0;

	listePizza.forEach((val) => {

		if (getStatus(val) === 'incomplete')
			nbIncomplete++;

	})
	return nbIncomplete;
}

let findWrong = function (listePizza){

	let nbIncomplete = 0;

	listePizza.forEach((val) => {

		if (getStatus(val) === 'wrong')
			nbIncomplete++;

	})
	return nbIncomplete;
}

let findComplete = function (listePizza){

	let nbIncomplete = 0;

	listePizza.forEach((val) => {

		if (getStatus(val) === 'complete')
			nbIncomplete++;

	})
	return nbIncomplete;
}



let loadRecipe = function (listRecipe){


	let toto = fetch('http://10.1.0.136:3000/recipes')
	.then(response => response.json())
	.then(recipe => recipe.forEach(recip => addRecipe(recip)));



}


let addRecipe = function (recipe){

	let h = document.createElement.bind(document);

	listeRecipe.push(recipe);

	let ul = document.getElementById('recipes');
	
	let li = h('li');

	li.innerHTML = recipe.name;
	li.classList.add('list-group-item');


	ul.appendChild(li);


}



loadRecipe(listeRecipe);








let button = document.getElementById('buttonAddRecipe');

function getRecipeName() {

	let recipe = {
		name : document.getElementById('recipeName').value,
		toppings :[]

	}

	addRecipe(recipe);
}

button.addEventListener('click', getRecipeName, false);



let ul = document.getElementById('recipes');

function removeRecipe() {

	ul.removeChild();
}

ul.addEventListener('click', removeRecipe, false);




function doThisLater() {

	console.log('fini ?');
}


promiseTimeout(5000)
.then(doThisLater);






function promiseTimeout(time) {



	return new Promise((resolve) => {

		setTimeout(resolve, time);

	});




}






let listePiz = [p1,p2];

console.log(findIncomplete(listePiz));



console.log([listeRecipe]);


console.log(getStatus(p1)); //
p1.toppings.push('ananas');
console.log(getStatus(p1)); //


p2.toppings.push('fromage');
p2.toppings.push('jambon');
console.log(getStatus(p2)); //



