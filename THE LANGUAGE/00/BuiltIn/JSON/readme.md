<h1>JavaScript Object Notation</h1>

<p>JSON is standart text-based format for representing structed databased on JS object syntax, mainly used
to transmit data from server side to client side and eventually display it on the web page. </p>

<h2>Example</h2>
```js
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
    },
  ]
}
```
<p>So basically it's a JS object that can has objects in it...  </p>

<h2>Accessing Data in a JSON file</h2>

```js
// members is an arrays of objects
superHeroes["members"][1]["powers"][2];
```

<li>Check out the DOM section to discover how to fetch JSON and integrate with the HTML</li>
