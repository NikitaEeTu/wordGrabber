import { EKILEX_API_KEY } from "../settings/key.js";

export const generateElement = (arr, elemData) => arr.forEach(elemText => {
    const htmlElem = document.createElement(elemData.name);
    const parentElem = document.getElementById(elemData.parent);
    const wordColumn = document.createElement("td");
    const btnColumn = document.createElement("td");
    wordColumn.innerText = elemText;
    btnColumn.appendChild(genDelBtn(arr, htmlElem));
    htmlElem.appendChild(wordColumn);
    htmlElem.appendChild(btnColumn);
    parentElem.appendChild(htmlElem);
})

const genDelBtn = (arr, delElem) => {
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", () => {
        delElem.remove();
        arr.splice(arr.indexOf(delElem), 1);
    });
    return delBtn;
}

export const removeAllElements = (parent) => {
    const parentElem = document.getElementById(parent);
    while(parentElem.hasChildNodes()) {
        parentElem.firstChild.remove();
    }
}

export const getData = async (url) => {
    try {
        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                   "ekilex-api-key": EKILEX_API_KEY
                },
            });
        if(!response.ok) {
            throw new Error("Response status: " + response.status);
        }
        return await response.json()
    }
    catch (error) {
        console.error(error.message);
    }
}