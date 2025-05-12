
const w = window

const elementsArray = Array.from(document.querySelectorAll('[id]'));

elementsArray.forEach(node=>{
    w[node.id] = node;
})