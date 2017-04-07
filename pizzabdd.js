const API_URL = "http://localhost:3000/pizzas";

let headers = new Headers();
headers.set("Content-Type", "application/json");

export class PizzaBdd {
    addPizza(Pizza) {
        return fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify(Pizza)
        }).then(response => response.json());
    }

    updatePizza(idPizza, Pizza) {
        return fetch(API_URL + "/" + idPizza, {
            method: "PUT",
            headers,
            body: JSON.stringify(Pizza)
        }).then(response => response.json());
    }

    deletePizza(idPizza) {
        return fetch(API_URL + "/" + idPizza, {
            method: "DELETE",
            headers
        }).then(response => response.json());
    }

    getAllPizza() {
        return fetch(API_URL, {
            method: "GET",
            headers
        }).then(response => response.json());
    }

    deleteAllPizza() {
        return this.getAllPizza().then(pizzas =>
            Promise.all(pizzas.map(({ id }) => this.deletePizza(id))));
    }

    getPizza(idPizza) {
        return fetch(`${API_URL}/${idPizza}`).then(response => response.json());
    }
}
