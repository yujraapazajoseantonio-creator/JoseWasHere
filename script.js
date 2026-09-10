const games = [
  {
    name: "Terraria",
    genre: "Aventura",
    description: "Explora, construye, lucha y descubre un enorme mundo en 2D.",
    price: "$9.99",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/105600/Terraria/"
  },
  {
    name: "Counter-Strike 2",
    genre: "Acción",
    description: "Shooter competitivo por equipos y evolución de Counter-Strike.",
    price: "Gratis",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/730/CounterStrike_2/"
  },
  {
    name: "Stardew Valley",
    genre: "Indie",
    description: "Crea tu granja, conoce personajes y disfruta de una vida tranquila.",
    price: "$14.99",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/413150/Stardew_Valley/"
  },
  {
    name: "The Witcher 3",
    genre: "RPG",
    description: "Acompaña a Geralt en una aventura épica llena de decisiones.",
    price: "$39.99",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"
  },
  {
    name: "Left 4 Dead 2",
    genre: "Acción",
    description: "Coopera con tus amigos para sobrevivir a hordas de infectados.",
    price: "$9.99",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/550/Left_4_Dead_2/"
  },
  {
    name: "Valheim",
    genre: "Supervivencia",
    description: "Sobrevive, construye y explora un mundo inspirado en la mitología nórdica.",
    price: "$19.99",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/892970/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/892970/Valheim/"
  },
  {
    name: "Hades",
    genre: "RPG",
    description: "Escapa del inframundo en este rápido roguelike de acción.",
    price: "$24.99",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/1145360/Hades/"
  },
  {
    name: "Dota 2",
    genre: "Acción",
    description: "MOBA competitivo gratuito con cientos de héroes y estrategias.",
    price: "Gratis",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/capsule_616x353.jpg",
    steam: "https://store.steampowered.com/app/570/Dota_2/"
  }
];

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");
const empty = document.getElementById("empty");
const filterButtons = document.querySelectorAll(".filter");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

let currentFilter = "Todos";

function renderGames() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = games.filter(game => {
    const matchesFilter =
      currentFilter === "Todos" || game.genre === currentFilter;

    const matchesSearch =
      game.name.toLowerCase().includes(search) ||
      game.genre.toLowerCase().includes(search);

    return matchesFilter && matchesSearch;
  });

  gamesContainer.innerHTML = "";

  filtered.forEach(game => {
    const isFree = game.price === "Gratis";

    const card = document.createElement("article");
    card.className = "game-card";

    card.innerHTML = `
      <div class="game-image">
        <img src="${game.image}" alt="Portada de ${game.name}" loading="lazy">
        <span class="game-genre">${game.genre}</span>
      </div>

      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.description}</p>

        <div class="game-bottom">
          <span class="price ${isFree ? "free-price" : ""}">
            ${game.price}
          </span>

          <a
            class="steam-link"
            href="${game.steam}"
            target="_blank"
            rel="noopener noreferrer">
            Steam ↗
          </a>
        </div>
      </div>
    `;

    gamesContainer.appendChild(card);
  });

  empty.style.display = filtered.length === 0 ? "block" : "none";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.dataset.filter;
    renderGames();
  });
});

searchInput.addEventListener("input", renderGames);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

renderGames();
