

Object.keys(Entries).forEach(key => {
    let techName = key
    let techEntries = Entries[techName]

    entriesDiv.innerHTML += `<h4 class="font-monospace"> -> ${techName}</h4>`

    techEntries.forEach(entry => {
        entriesDiv.innerHTML += `<p class="text-primary" onclick="loadContent('${entry.path}')">${entry.title}</p>`
    })

})


function loadContent(path){
    let originalPath = path
    path = 'snippets/' + path + '.html'
    fetch(path).then(data=>{
        if(data.ok|| data.status == 304) return data.text()
        else return "Not found"
    }).then(data=>{
        contentDiv.innerHTML = data
        const url = new URL(window.location.href);
        url.searchParams.set("entry", originalPath.replace('/','_'));
        window.history.replaceState({}, '', url.toString());
    })
}

const params = new URLSearchParams(window.location.search);

// Obtener un parámetro específico:
const entry = params.get("entry");

if(entry){
    loadContent(entry.replace('_','/'))
}
