# Browser Technologies @cmda-minor-web 20-21


## Demo

- [Live demo](#)


## Concept
Voor dit vak, maak ik een enquette dat waar de gebruiker vakken gedurende de minor in kan vullen. De gebruiker wilt met gemak de enquette invullen en indien beschikbaar, de UX verbeteren met enchancements

### Core functionality

Mijn core functionaliteit is het invullen van een enquette. Deze wordt ondersteund met een server waar de gegevens opgeslagen wordt voor submittion of herstellen van de voortgang.

### Wireflow

![Wireflow](./assets/wireflow.png)

### Breakdown

![Breakdown](./assets/breakdown.png)

## Enhancements

### Functional
Er wordt een `<form>` weergeven met daarin `<fieldset>` waarin de invulvelden van de vakken in staan. De gebruiker kan er dan doorheen scrollen en invullen.

![](./assets/layer_functional.png)

### Usable
Desondanks de `<fieldset>` een goed onderscheid maakt tussen de vakken, is het fijn om op slechts 1 vak per keer te focussen. Met CSS worden de vaken naast elkaar geplaatst als een carousel waarin de gebruiker door per vak kan kiezen.

![](./assets/layer_usable.png)

**prefers-reduced-motion**

Doordat er best wat beweging in het ontwerp zit, heb ik voor de gebruikers die dit niet willen het uitgezet met de media query `@media (prefers-reduced-motion)`.

Om de website redelijk ruimte te geven op kleiner schermen zoals telefoons, heb ik met clamp deze responsive gemaakt. Clamp is niet overal ondersteund. Hiervoor heb ik de volgende toegepast: 

`@supports (width: clamp(1px, 1px, 1px))`

Mocht het ondersteund zijn, wordt het toegepast. Zo niet, dan wordt het met `vw` gedaan.

### Pleasurable 
Om de ervaring helemaal compleet te maken, wordt de overbodige interactie overgenomen met javascript. De gebruiker hoeft niet meer op submit te klikken, de website merkt wanner alles ingevuld is en doet deze automatisch. Daarnaast laat het ook de voorgang zien door de voltooide vakken weg te strepen.

![](./assets/layer_pleasurable.png)

## Browser testing

| Device  | Browser |
| ------- | ------- |
| Desktop | Chrome  |
| Desktop | Firefox |
| Android | Chrome  |
| Android | Firefox |

### Test rapport
1. Enquette invullen
<details>
<summary>rapport</summary>

* Chrome Desktop | ✅  
* Chrome Android | ✅    
* Firefox Desktop | ✅  
* Firefox Android | ✅  

</details>
2. Usable en pleasurable (carousel) werkend
<details>
<summary>rapport</summary>
* Chrome Desktop | ✅  
* Chrome Android | ✅    
* Firefox Desktop | ✅  
* Firefox Android | ✅  
</details>
3. Colors
<details>
<summary>rapport</summary>
Headers
<img  src='./assets/headers.png' />

Navigation labels
<img  src='./assets/label.png' />

Active input
<img  src='./assets/input_active.png' />

Inactive input
<img  src='./assets/input_back.png' />

</details>

## Structure
De dataflow gaat als volgt: 

1. Server renders form
2. Users fills form
3. Server fetches and saves
4. Server returns saved data
  
### Data
Om onderscheid te maken tussen de gebruikers, wordt er gebruik gemaakt van hashes. Hierdoor weet de server welk data bij welke gebruiker hoort.

Hierbij een sample hoe dat eruit ziet met een vak als voorbeeld
```JSON
[
  {
    "hash": "61df5e0b4dd983a12353ea07e6291d73",
    "userData": {
      "studentnummer": "500123456",
      "name": "Jouwnaam",
      "btech-docent": "PPK",
      "btech-week": [
        1,
        3
      ],
      "btech-eigeninzichten": "Lastig vak",
      "btech-beoordeling": "6",
      "btech-lesstof": "lastig",
      "btech-uitleg": "wel oke"
    }
  }
]
```


## Enhancements
1. Custom validity messages met javasctipt
2. Input velden met patterns ondersteunen met CSS (in)valid
3. Een carousel ontwerp waarbij slecht een van per keer te zien is.
