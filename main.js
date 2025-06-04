

Object.keys(Entries).forEach(key => {
    let techName = key
    let techEntries = Entries[techName]

    entriesDiv.innerHTML += `<h4 class="font-monospace"> -> ${techName}</h4>`

    techEntries.forEach(entry => {
        entriesDiv.innerHTML += `<p class="text-primary btn" onclick="loadContent('${entry.path}')">${entry.title}</p>`
    })

})


function loadContent(path){
    let originalPath = path
    path = 'snippets/' + path + '.html'
    fetch(path).then(data=>{
        
        if(data.ok|| data.status == 304) return data.text()
        else return "Not found"
    }).then(data=>{
        data=data.replaceAll('<check/>', '<check></check>');
        data=data.replaceAll('<cross/>', '<cross></cross>');
        contentDiv.innerHTML = data
        alignCodeSections()
        postProcessContent(originalPath)
        const url = new URL(window.location.href);
        url.searchParams.set("entry", originalPath.replace('/','_'));
        window.history.replaceState({}, '', url.toString());
    })
}

function alignCodeSections(){
    const preelements = document.querySelectorAll('pre')

    // PARA CADA <PRE>
    for(let pre of preelements)
    {
        
        let preContent = pre.textContent
        let lines = preContent.split('\n')

        // Cuantos espacios en blanco al inicio tiene la linea que menos de ellos tiene
        let lessSpacesLineSpaces = null

        // PARA CADA LINEA DENTRO DE UN <PRE>
        for(let line of lines){
            
            let spaces = 0
            if(line[0]!=' ') break;
            
            // PARA CADA CARACTER DENTRO DE LA LINEA
            for(let char of line){
                if(char!=' ') 
                {
                    if(lessSpacesLineSpaces == null) lessSpacesLineSpaces = spaces
                    
                    if(spaces < lessSpacesLineSpaces)
                    {
                        lessSpacesLineSpaces = spaces
                    }
                    
                    break
                }
                else
                {
                    spaces++
                }
            }
        }

        if(lessSpacesLineSpaces == 0) 
        {
            console.log(lessSpacesLineSpaces);
            continue
        }
        else
        {
            let formatted = ''

            // PARA CADA LINEA DENTRO DE UN <PRE>
            for(let line of lines){
                formatted += line.slice(lessSpacesLineSpaces) + '\n'
            }
            
            pre.textContent=formatted.slice(0, formatted.length-1)
        }
    }
}

function postProcessContent(path){

    const filesElement = contentDiv.querySelectorAll('file')

    for(let f of filesElement)
    {
        let text = f.textContent;
        f.outerHTML = '<span class="badge bg-file">'+text+'</span>'
    }

    const pathElement = contentDiv.querySelectorAll('path')
    for(let f of pathElement)
    {
        let text = f.textContent;
        f.outerHTML = '<span class="badge bg-file">'+text+'</span>'
    }

    const checkElement = contentDiv.querySelectorAll('check')
    for(let f of checkElement)
    {
        f.outerHTML = '<span>✅</span>'
    }

    const crossElement = contentDiv.querySelectorAll('cross')
    for(let f of crossElement)
    {
        f.outerHTML = '<span>❌</span>'
    }

    const alertElement = contentDiv.querySelectorAll('alert')
    for(let f of alertElement)
    {
        f.outerHTML = '<span>❌</span>'
    }

    const warningElement = contentDiv.querySelectorAll('warning')
    for(let f of warningElement)
    {
        f.outerHTML = '<div class="warning-box">'+f.innerHTML+'</div>'
    }

    const imageElement = contentDiv.querySelectorAll('picture')
    for(let f of imageElement)
    {
        let imgName = f.getAttribute('path')
        console.log(`../assets/${path}/${imgName}`);
        // return
        
        let tag_img = document.createElement('img')
        tag_img.src = `../assets/${path}/${imgName}`
        // f.parentElement.insertBefore(tag_img, f)
        
        f.outerHTML = `<img data-src="../assets/${path}/${imgName}" src="../assets/${path}/imgs/${imgName}"/>`
    }

     
}

const params = new URLSearchParams(window.location.search);

// Obtener un parámetro específico:
const entry = params.get("entry");

if(entry){
    loadContent(entry.replace('_','/'))
}
