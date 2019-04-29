//DOM
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//functions
const searchStates = async searchText => {
  //fetch the data from state.json
  const res = await fetch("../data/state.json");
  const states = await res.json();

  //get matches current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
};

//display results
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        <div class ="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) 
            <span class="text-primary">${match.capital}</span>
            </h4>
            <small>lat:${match.lat} / long:${match.long}</small>
        </div>
    `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

//event listener
search.addEventListener("input", () => searchStates(search.value));
