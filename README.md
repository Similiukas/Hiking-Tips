# Hiking Tips App
*Working Website at [Hiking Tips]()*

A simple Express REST API + showcasing website for getting tips about what to take for a hike

## Website

Using the website is simple. Just set what is the distance of your hike, at which season are you planning to go and are you vegetarian. Then the webiste will think and show you what are some things you should consider taking with yourself *(no computer can be definitive, it can only suggest and you should always think by yourself)*.

## API

To use the api, you need to make an http `POST` request with headers `Content-Type: application/json`. The body of the `POST` request must be in the format:
```
{
    distance: of type number,
    season: "winter" || "autumn" || "spring" || "summer",
    vegetarian?: optional boolean parameter
}
```
Available endpoints
- **`/api/food`:**
<br>Will give information about what kind of food should the user take. Example response:
```
{
  "possibleNumberOfDays": [
    1
  ],
  "days": [
    {
      "food": {
        "apples": 3,
        "bananas": 2,
        "carrots": 0,
        "instantNoodles": 0,
        "chips": 1,
        "proteinBars": 2,
        "gum": 1,
        "darkChocolate": 1,
        "sausages": 0,
        "tuna": 0,
        "beefJerky": 0,
        "riceCakes": 0,
        "cheese": 0,
        "nuts": 1,
        "water": 2000,
        "instantOats": 0,
        "marshmallows": 0,
        "granolaBars": 0,
        "potato": 0,
        "bread": 0,
        "cucumber": 0,
        "tomato": 0,
        "cookingPot": 0,
        "gasStove": 0
      }
    }
  ]
}
```
- **`/api/shelter`:**
<br>Will give information about what kind of shelter user should bring. Example response:
```
{
  "possibleNumberOfDays": [
    1
  ],
  "days": [
    {
      "shelter": {
        "tents": 0,
        "sleepingBag": 0,
        "inflatabelTravelPillow": 0,
        "extraBlanket": 0
      }
    }
  ]
}
```
- **`/api/misc`:**
<br>Gives information about some other useful items in a hike. Example response:
```
{
  "miscellaneous": {
    "map": 1,
    "matches": 1,
    "thermosFlask": 1,
    "tea": 1,
    "handSanitizer": 1,
    "paperPlates": 10,
    "knife": 1,
    "fork": 1,
    "spoon": 1,
    "thrashBags": 15,
    "torch": 1,
    "batteries": 4,
    "ziplockBags": 10,
    "salt": 1,
    "pepper": 1,
    "hotSauce": 1,
    "foil": 1,
    "cups": 2,
    "scicors": 1,
    "bandages": 3,
    "patches": 10,
    "toiletPaperRolls": 1,
    "bugSpray": 1,
    "umbrella": 0,
    "sunglasses": 0,
    "woolenHat": 1,
    "woolenSocks": 2,
    "woolenGloves": 2
  }
}
```
- **`/api/all`:**
<br>Combines all of the above into a single http `POST` request