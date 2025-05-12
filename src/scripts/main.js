

document.addEventListener('DOMContentLoaded', function () {
    addItems();
    
    let del = document.getElementById('del');
    del.addEventListener("click", clear);
    let save = document.getElementById('save')
    save.addEventListener("click", sve);
    let load = document.getElementById('load')
    load.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            ld(file);
        }
    });
});

function addItems() {
    let list = document.getElementById('items');
    const games = JSON.parse(localStorage.getItem("games"));

    if (games == null) {
        return;
    }
    
    let count = 1;
    games.forEach(game => {
        const item = document.createElement('li');
        const img = document.createElement('img');
        const br = document.createElement("br");

        console.log(game.image);
        item.classList.add('boxed');
        item.textContent = `${count}: ${game.title}    `;

        img.setAttribute('src', game.image);
        img.setAttribute('alt', `${game.title} Box Art`)
        img.appendChild(br);
        item.appendChild(img);
        list.appendChild(item);
        count++;
    });
}

function clear() {
    localStorage.clear();
}

function sve() {
    const games = JSON.parse(localStorage.getItem("games"));
    console.log("test");
    if (games == null) {
        return;
    } else {

        const fileStr = JSON.stringify(games, null, 2); // Pretty print

        const blob = new Blob([fileStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();

        URL.revokeObjectURL(url); // Clean up
    }

}

async function ld(file) {
    console.log("To be added...");
}