
Object.keys(Entries).forEach(key => {
    let techName = key
    let techEntries = Entries[techName]

    entriesDiv.innerHTML += `<h4 class="font-monospace"> -> ${techName}</h4>`

    techEntries.forEach(entry => {
        entriesDiv.innerHTML += `<p class="text-primary" onclick="loadContent('${entry.path}')">${entry.title}</p>`
    })

})


function loadContent(path){
    path = 'snippets/' + path + '.html'
    fetch(path).then(data=>data.text()).then(data=>contentDiv.innerHTML =data )
    
}

loadContent('php/dates')