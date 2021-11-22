let data = [];
let results = document.getElementById("results");
let count = 0;
let indexEl = 0;
let page = 1;

async function fetchdata(page) {
  try {
    await fetch(
      `https://api.github.com/search/users?q=" "&&page=${page}&&per_page=25`
    )
      .then((res) => res.json())
      .then((res) => {
        data.push(res.items);
        indexEl += data[0].length;
        console.log(indexEl);
        data[0].forEach((el, i) => {
          count++;
          adddata(el, i);
        });
      });
  } catch (err) {
    console.log("Error : ", err);
  }
}

fetchdata(page);

function adddata(el, index) {
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("class", "mainDiv");
  // For storing serial number
  let number = document.createElement("div");
  number.setAttribute("class", "number");
  let ind = document.createElement("h1");
  ind.innerText = count;
  number.append(ind);

  // Card Element
  let card = document.createElement("div");
  card.setAttribute("class", "cards");

  // First Main Div
  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "imgDiv");
  let img = document.createElement("img");
  imgDiv.append(img);
  img.src = el.avatar_url;

  // Second Main Div
  let detailsDiv = document.createElement("div");
  detailsDiv.setAttribute("class", "detailsDiv");
  let username = document.createElement("b");
  username.innerText = "UserName";
  let name = document.createElement("p");
  name.setAttribute("class", "name");
  name.innerText = el.login;

  detailsDiv.append(username, name);

  // Appending to the card
  card.append(imgDiv, detailsDiv);
  mainDiv.append(number, card);
  results.append(mainDiv);
}

let result = document.getElementById("result");

result.onscroll = () => {
  let difference = result.scrollHeight - result.clientHeight;
  let scrollposition = result.scrollTop;
  if (difference - scrollposition <= 2) {
    fetchdata(++page);
    console.log("Reached End");
  }
};
