const apiUrl = "https://restcountries.com/v3.1/all";
let countries = [];
let filteredCountries = [];
let currentPage = 1;
const rowperpage = 25;

document.addEventListener("DOMContentLoaded", () => {
  fetchCountries();
  document.getElementById("search").addEventListener("input", handleSearch);
  document.getElementById("sort").addEventListener("change", handleSort);
  document.getElementById("prevPage").addEventListener("click", () => changePage(-1));
  document.getElementById("nextPage").addEventListener("click", () => changePage(1));
});

async function fetchCountries() {
  try {
    const response = await fetch(apiUrl);
    countries = await response.json();
    filteredCountries = [...countries];
    displayCountries();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

function handleSearch() {
  const query = document.getElementById("search").value.toLowerCase();
  filteredCountries = countries.filter(country =>
    country.name.official.toLowerCase().includes(query)
  );
  currentPage = 1;
  displayCountries();
}

function handleSort() {
  const sortOption = document.getElementById("sort").value;
  filteredCountries.sort((a, b) =>
    sortOption === "asc"
      ? a.name.official.localeCompare(b.name.official)
      : b.name.official.localeCompare(a.name.official)
  );
  displayCountries();
}

function changePage(direction) {
  currentPage += direction;
  displayCountries();
}

function displayCountries() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  const start = (currentPage - 1) * rowperpage;
  const end = start + rowperpage;
  const paginatedCountries = filteredCountries.slice(start, end);

  paginatedCountries.forEach(country => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.official} Flag" width="100">
      <h3>${country.name.official}</h3>
      <p>CCA2: ${country.cca2}</p>
      <p>CCA3: ${country.cca3}</p>
    `;
    card.addEventListener("click", () => showModal(country));
    catalog.appendChild(card);
  });

  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${Math.ceil(filteredCountries.length / rowperpage)}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = end >= filteredCountries.length;
}

function showModal(country) {
    const modal = document.getElementById("countryModal");
    const countryDetails = document.getElementById("countryDetails");

    countryDetails.innerHTML = `
      <h2 class="modal-title">${country.name.official}</h2>
      <div class="row">
        <div class="col-6">
          <img src="${country.flags.png}" alt="${country.name.official} Flag" width="150">
        </div>
        <div class="col-6">
          <p><strong>Native Name:</strong> ${Object.values(country.name.nativeName || {})
            .map(name => name.official)
            .join(", ")}</p>
          <p><strong>Alternative Names:</strong> ${country.altSpellings.join(", ")}</p>
          <p><strong>Calling Codes:</strong> ${country.idd.root}${country.idd.suffixes ? country.idd.suffixes.join(", ") : ""}</p>
        </div>
      </div>
    `;

    modal.style.display = "flex";
    document.querySelector(".close").onclick = () => (modal.style.display = "none");
  }

