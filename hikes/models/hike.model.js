// Default items
var foodResponseTemplate = {
    apples: 3,
    bananas: 2,
    carrots: 0,
    instantNoodles: 0,
    chips: 1,
    proteinBars: 2,
    gum: 1,
    darkChocolate: 1,
    sausages: 0,
    tuna: 0,
    beefJerky: 0,
    riceCakes: 0,
    cheese: 0,
    nuts: 1,
    water: 2000,
    instantOats: 0,
    marshmallows: 0,
    granolaBars: 0,
    potato: 0,
    bread: 0,
    cucumber: 0,
    tomato: 0,
    cookingPot: 0,
    gasStove: 0
}
var shelterResponseTemplate = {
    tents: 0,
    sleepingBag: 0,
    inflatabelTravelPillow: 0,
    extraBlanket: 0
}
var miscResponseTemplate = (season) => {
    return {
        map: 1,
        matches: 1,
        thermosFlask: 1,
        tea: 1,
        handSanitizer: 1,
        paperPlates: 10,
        knife: 1,
        fork: 1,
        spoon: 1,
        thrashBags: 15,
        torch: 1,
        batteries: 4,
        ziplockBags: 10,
        salt: 1,
        pepper: 1,
        hotSauce: 1,
        foil: 1,
        cups: 2,
        scicors: 1,
        bandages: 3,
        patches: 10,
        toiletPaperRolls: 1,
        bugSpray: 1,
        umbrella: season !== "winter" ? 1 : 0,
        sunglasses: season === "spring" || season === "summer" ? 1 : 0,
        woolenHat: season === "winter" ? 1 : 0,
        woolenSocks: season === "winter" ? 2 : 0,
        woolenGloves: season === "winter" ? 2 : 0
    }
}
// Checking if argument is a boolean or not
function checkIfBool(obj) {
    if (obj === false || obj === true) {
        return obj;
    }
    return undefined;
}
// Checking if provided element is a valid season
function checkSeason(obj) {
    if (obj === "winter" || obj === "summer" || obj === "autumn" || obj === "spring") {
        return obj;
    }
    return null;
}
// Checking if required parameters are supplied
function checkParameters(obj) {
    const distance = parseInt(obj?.distance);
    const season = checkSeason(obj?.season.toLowerCase());
    // Missing required parameters (some string, then we get NaN, also 0 is not accepted)
    if (!distance || !season || distance < 0) {
        return [null];
    }
    return [distance, season];
}
// Getting all the possible number of days by given distance
function getPossibleDays(distance) {
    if (distance <= 10) {
        return [ 1 ];
    }
    else if (distance <= 20) {
        return [1, 2];
    }
    else if (distance <= 50) {
        return [1, 2, 3];
    }
    else if (distance <= 100) {
        return [1, 2, 3, 4, 5];
    }
    return [1, 2, 3, 4, 5, 6, 7];
}
// Updating food for some number of days
function updateFoodForDays(food, numberOfDays, vegetarian) {
    return {
        ...food,
        instantNoodles: numberOfDays - 1,
        proteinBars: numberOfDays,
        sausages: vegetarian ? 0 : (numberOfDays - 1) * 4,
        tuna: vegetarian ? 0 : (numberOfDays > 2 ? (numberOfDays - 2) : 0),
        beefJerky: vegetarian ? 0 : (numberOfDays > 3 ? (numberOfDays - 3) : 0),
        granolaBars: vegetarian ? numberOfDays + 3 : numberOfDays,
        water: numberOfDays * 1800,
        instantOats: numberOfDays - 1,
        marshmallows: numberOfDays < 3 ? 1 : 0,
        potato: numberOfDays > 3 ? 5 : 2,
        bread: numberOfDays + 2,
        cucumber: numberOfDays > 4 ? 2 : 1,
        tomato: numberOfDays > 4 ? 2 : 1,
        cookingPot: 1,
        gasStove: 1
    };
}
// Determining how much food to take
function determineFoodForDistance(obj, distance, vegetarian=false) {
    var defaultFood = { ...foodResponseTemplate};
    if (distance <= 10) {
        obj[0] = { ...obj[0], food: defaultFood };
    }
    else if (distance <= 20) {
        defaultFood.apples = 5,
        defaultFood.bananas = 2,
        defaultFood.chips = 1,
        defaultFood.riceCakes = 1,
        defaultFood.water = 2000
        obj[0] = { ...obj[0], food: defaultFood };
        obj[1] = { ...obj[1], food: updateFoodForDays(defaultFood, 2, vegetarian) };
    }
    else if (distance <= 50) {
        defaultFood.apples = 7,
        defaultFood.bananas = 3,
        defaultFood.chips = 1,
        defaultFood.riceCakes = 1,
        defaultFood.water = 3000
        obj[0] = { ...obj[0], food: defaultFood };
        obj[1] = { ...obj[1], food: updateFoodForDays(defaultFood, 2, vegetarian) };
        obj[2] = { ...obj[2], food: updateFoodForDays(defaultFood, 3, vegetarian) };
    }
    else if (distance <= 100) {
        defaultFood.carrots = 2
        defaultFood.riceCakes = 1,
        defaultFood.water = 3500
        obj[0] = { ...obj[0], food: defaultFood };
        for (let i = 1; i < 5; i++) {
            obj[i] = { ...obj[i], food: updateFoodForDays(defaultFood, i + 1, vegetarian) };
        }
    }
    else {
        defaultFood.carrots = 3
        defaultFood.riceCakes = 2,
        defaultFood.water = 5000
        obj[0] = { ...obj[0], food: defaultFood };
        for (let i = 1; i < 7; i++) {
            obj[i] = { ...obj[i], food: updateFoodForDays(defaultFood, i + 1, vegetarian) };
        }
    }
}
// Determining how much shelter equipment should be taken
function determineShelterForDistance(obj, season) {
    var defaultShelter = { ...shelterResponseTemplate };
    obj[0] = { ...obj[0], shelter: defaultShelter };
    // If only one day
    if (obj.length === 1) {
        return;
    }
    let overNightShelter = { ...shelterResponseTemplate };
    // More than one day
    if (season === "winter") {
        overNightShelter.extraBlanket = 2;
    }
    else if (season === "autumn") {
        overNightShelter.extraBlanket = 1;
    }
    overNightShelter.inflatabelTravelPillow = 1;
    overNightShelter.sleepingBag = 1;
    overNightShelter.tents = 1;
    // Every day shelter object is the same
    for (var i = 1; i < obj.length; ++i) {
        obj[i] = { ...obj[i], shelter: overNightShelter };
    }
}

exports.food = (information) => {
    try {
        const [distance, season] = checkParameters(information);
        if (!distance) return null;
        const vegetarian = checkIfBool(information?.vegetarian);
    
        const possibleDays = getPossibleDays(distance);
        var response = {
            possibleNumberOfDays: possibleDays,
            days: new Array(possibleDays[possibleDays.length - 1])
        }
        determineFoodForDistance(response.days, distance, vegetarian);
        return response;
    } catch (error) {
        return undefined
    }
}

exports.shelter = (information) => {
    try {
        const [distance, season] = checkParameters(information);
        if (!distance)  return null;

        const possibleDays = getPossibleDays(distance);
        var response = {
            possibleNumberOfDays: possibleDays,
            days: new Array(possibleDays[possibleDays.length - 1])
        }
        determineShelterForDistance(response.days, season);
        return response;
    } catch (error) {
        return undefined;
    }
}

exports.misc = (information) => {
    const [distance, season] = checkParameters(information);
    if (!distance)    return null;
    return { miscellaneous: miscResponseTemplate(season) };
}

exports.all = (information) => {
    try {
        const [distance, season] = checkParameters(information);
        if (!distance)  return null;
        const vegetarian = checkIfBool(information?.vegetarian);

        const possibleDays = getPossibleDays(distance);
        var response = {
            possibleNumberOfDays: possibleDays,
            days: new Array(possibleDays[possibleDays.length - 1]),
            miscellaneous: miscResponseTemplate(season)
        }
        determineFoodForDistance(response.days, distance, vegetarian);
        determineShelterForDistance(response.days, season);
        return response;
    } catch (error) {
        return undefined;
    }
}
