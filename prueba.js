// Advanced Genetic Algorithm for Traveling Salesman Problem (TSP) Approximation
// This script generates random cities, uses genetic algorithms to find an approximate optimal route,
// and outputs the best route found after several generations.

class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(city) {
    const dx = this.x - city.x;
    const dy = this.y - city.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Route {
  constructor(cities) {
    this.cities = [...cities];
    this.distance = this.calculateDistance();
  }

  calculateDistance() {
    let distance = 0;
    for (let i = 0; i < this.cities.length - 1; i++) {
      distance += this.cities[i].distanceTo(this.cities[i + 1]);
    }
    distance += this.cities[this.cities.length - 1].distanceTo(this.cities[0]); // Return to start
    return distance;
  }

  shuffle() {
    for (let i = this.cities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cities[i], this.cities[j]] = [this.cities[j], this.cities[i]];
    }
    this.distance = this.calculateDistance();
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.cities.length; i++) {
      if (Math.random() < mutationRate) {
        const j = Math.floor(Math.random() * this.cities.length);
        [this.cities[i], this.cities[j]] = [this.cities[j], this.cities[i]];
      }
    }
    this.distance = this.calculateDistance();
  }

  crossover(partner) {
    const start = Math.floor(Math.random() * this.cities.length);
    const end = Math.floor(Math.random() * (this.cities.length - start)) + start;
    const childCities = new Array(this.cities.length).fill(null);
    const used = new Set();

    // Copy segment from parent1
    for (let i = start; i < end; i++) {
      childCities[i] = this.cities[i];
      used.add(this.cities[i]);
    }

    // Fill remaining from parent2
    let index = 0;
    for (let i = 0; i < partner.cities.length; i++) {
      if (!used.has(partner.cities[i])) {
        while (childCities[index] !== null) index++;
        childCities[index] = partner.cities[i];
      }
    }

    return new Route(childCities);
  }
}

class Population {
  constructor(size, cities) {
    this.routes = [];
    this.size = size;
    for (let i = 0; i < size; i++) {
      const route = new Route(cities);
      route.shuffle();
      this.routes.push(route);
    }
    this.routes.sort((a, b) => a.distance - b.distance);
  }

  getBest() {
    return this.routes[0];
  }

  evolve(elitismCount, mutationRate) {
    const newRoutes = [];

    // Elitism: keep best routes
    for (let i = 0; i < elitismCount; i++) {
      newRoutes.push(this.routes[i]);
    }

    // Crossover
    while (newRoutes.length < this.size) {
      const parent1 = this.selectParent();
      const parent2 = this.selectParent();
      const child = parent1.crossover(parent2);
      child.mutate(mutationRate);
      newRoutes.push(child);
    }

    this.routes = newRoutes;
    this.routes.sort((a, b) => a.distance - b.distance);
  }

  selectParent() {
    // Tournament selection
    const tournamentSize = 5;
    let best = null;
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * this.routes.length);
      const candidate = this.routes[randomIndex];
      if (!best || candidate.distance < best.distance) {
        best = candidate;
      }
    }
    return best;
  }
}

// Generate random cities
const numCities = 20;
const cities = [];
for (let i = 0; i < numCities; i++) {
  cities.push(new City(Math.random() * 100, Math.random() * 100));
}

// Run genetic algorithm
const populationSize = 100;
const generations = 1000;
const elitismCount = 5;
const mutationRate = 0.01;

let population = new Population(populationSize, cities);

for (let gen = 0; gen < generations; gen++) {
  population.evolve(elitismCount, mutationRate);
  if (gen % 100 === 0) {
    console.log(`Generation ${gen}: Best distance = ${population.getBest().distance.toFixed(2)}`);
  }
}

const bestRoute = population.getBest();
console.log(`\nBest route found:`);
bestRoute.cities.forEach((city, index) => {
  console.log(`${index}: (${city.x.toFixed(2)}, ${city.y.toFixed(2)})`);
});
console.log(`Total distance: ${bestRoute.distance.toFixed(2)}`);