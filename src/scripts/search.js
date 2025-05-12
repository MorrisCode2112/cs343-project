const client_id = "4j7x5pey16vn4the3o3yip1olkvh4d";
const client_secret = "6kavtb4yh6jks5a9fup3fyjmicjicv";

document.addEventListener("DOMContentLoaded", () => {
    let submit = document.getElementById('submit');
    submit.addEventListener("click", search);
    
});
    
async function search(event) {
    event.preventDefault();
    let query = document.getElementById('title').value;

    try {
        const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: client_id,
                client_secret: client_secret,
                grant_type: "client_credentials"
            })
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        const response = await fetch(`https://api.twitch.tv/helix/search/categories?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Client-ID": client_id,
                "Authorization": `Bearer ${accessToken}`
            },

        });

        if (!response.ok) {
            throw new Error(`Game search failed: ${response.status}`);
        }

        const gameData = await response.json();
        console.log("Game search result:", gameData);

        let list = document.getElementById('items');
        let child = list.lastElementChild;
        while (child) {
            list.removeChild(child);
            child = list.lastElementChild;
        }
        results = document.createElement('p');
        results.textContent = "Results:";
        list.appendChild(results);
        let count = 1;

        gameData.data.forEach(game => {
            console.log(game.name);

            const item = document.createElement('p');
            const img = document.createElement('img');
            const line = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = "Add";
            button.addEventListener("click", () => save(game.name, game.box_art_url));
            line.classList.add('boxed');

            item.textContent = `${count}: ${game.name}`;

            img.setAttribute('src', game.box_art_url);
            img.setAttribute('alt', `${game.name} Box Art`)

            line.appendChild(item);
            line.appendChild(img);
            line.appendChild(button);
            list.append(line);
            count++;
        });
        
    } catch (error) {
    }
}

function save(name, img) {
    const storedGames = JSON.parse(localStorage.getItem("games")) || [];

    storedGames.push({ title: name, image: img });
    localStorage.setItem("games", JSON.stringify(storedGames));
    window.location.href = "../index.html";
}
