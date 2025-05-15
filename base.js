
const w = window

const elementsArray = Array.from(document.querySelectorAll('[id]'));

elementsArray.forEach(node=>{
    w[node.id] = node;
})

function _find(id){
    return document.getElementById(id)
}

function _create(tag){
    return document.createElement(tag)
}

HTMLElement.prototype._setText = function(text){
    this.textContent = text
    return this
}

HTMLElement.prototype._setParent = function(parent){
    parent.appendChild(this)
    return this
}

HTMLElement.prototype._addClass = function(classes){

    const node = this

    if(typeof classes == 'string'){
        classes = [classes]
    }

    classes.forEach(clss => {
        node.classList.add(clss)
    });
    return this
}

HTMLElement.prototype._append = function(node){
    this.appendChild(node)
    return this
}

HTMLElement.prototype._setAttr = function(attr,val){
    this.setAttribute(attr,val)
    return this
}

HTMLElement.prototype._clear = function(){
    this.innerHTML=''
    return this
}

HTMLElement.prototype._html = function(html){
    this.innerHTML=html
    return this
}

HTMLElement.prototype._addHtml = function(html){
    this.innerHTML+=html
    return this
}

HTMLElement.prototype._transform = function(tag){
    let content = this.innerHTML;
    this.outerHTML = `<${tag}>${content}</${tag}>`
    return this
}