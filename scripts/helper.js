import { EKILEX_API_KEY } from "../settings/key";

export const generateElement = (arr, elemData) => arr.forEach(elemText => {
    const htmlElem = document.createElement(elemData.name);
    htmlElem.innerText = elemText;
    const parentElem = document.getElementById(elemData.parent);
    parentElem.appendChild(htmlElem);
})

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