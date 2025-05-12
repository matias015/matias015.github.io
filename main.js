
Object.keys(Entries).forEach(key => {
    let techName = key
    let techEntries = Entries[techName]

    entriesDiv.innerHTML += `<h4>${techName}</h4>`

    techEntries.forEach(entry => {
        entriesDiv.innerHTML += `<p>${entry.title}</p>`
    })

})