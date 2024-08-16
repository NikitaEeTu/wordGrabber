export const generateElement = (arr, elemData) => arr.forEach(elemText => {
    const htmlElem = document.createElement(elemData.name);
    htmlElem.innerText = elemText;
    const parentElem = document.querySelector("#" + elemData.parent);
    parentElem.appendChild(htmlElem);
})

export const removeAllElements = (parent) => {
    const parentElem = document.querySelector("#" + parent);
    while(parentElem.hasChildNodes()) {
        parentElem.firstChild.remove();
    }
}