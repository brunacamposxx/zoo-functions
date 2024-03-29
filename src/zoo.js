/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const emptyArray = [];
  ids.forEach(newID => emptyArray.push(animals.find(parametro => parametro.id === newID)));
  return emptyArray;
}

function animalsOlderThan(animal, age) {
  const especies = animals.find(especie =>
    especie.name === animal).residents.every(resident =>
    resident.age >= age);
  return especies;
}

function employeeByName(employeeName = false) {
  let name = {};
  if (!employeeName) return name;
  name = employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return name;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const employee = createEmployee(personalInfo, associatedWith);
  employees.push(employee);
}

function animalCount(species) {
  const result = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  if (species) return result[species];
  return result;
}

function entryCalculator(entrants) {
  return !entrants ? 0 : Object.keys(entrants)
    .reduce((total, key) => total + (entrants[key] * prices[key]), 0);
}

function animalMap(options = {}) {

}

function schedule(dayName) {
  const result = Object.entries(hours).reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close - 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (dayName !== undefined) return { [dayName]: result[dayName] };
  return result;
}

function employeeID(id) {
  return employees.find(employee => employee.id === id);
}

function oldestFromFirstSpecies(id) {
  return Object.values(animals.find(specie => specie.id === employees
    .filter(numberId => numberId.id === id)[0].responsibleFor[0]).residents
    .reduce((accumulater, currentAge) => (
      accumulater.age > currentAge.age ? accumulater : currentAge
    )));
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((ageRange) => {
    prices[ageRange] =
      Math.round((prices[ageRange] * 100) * ((percentage / 100) + 1)) / 100;
  });
  return prices;
}

function fullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

function employeeCoverage(idOrName) {
  const result = employees.reduce((acc, employee) => {
    acc[fullName(employee)] = employee.responsibleFor
      .map(animalsIds => animalsByIds(animalsIds)[0])
      .map(({ name }) => name);
    return acc;
  }, {});
  if (idOrName !== undefined) {
    const employee = employeeID(idOrName) || employeeByName(idOrName);
    const employeefullName = fullName(employee);
    if (employee) return { [employeefullName]: result[employeefullName] };
  }
  return result;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
