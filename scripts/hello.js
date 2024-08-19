import { generateElement, getData, removeAllElements } from "./helper.js";

const delBtn = document.getElementById("delBtn");
const selectedWordElem = document.getElementById("word");
const translatedWordElem = document.getElementById("translatedWord");
const urls = {
    wordId: "https://ekilex.ee/api/word/search",
    wordTranslation: "https://ekilex.ee/api/word/details",
    dict: "eki"
}
document.addEventListener("DOMContentLoaded", function() {
    let port = chrome.runtime.connect({name: "hello"});

    port.onMessage.addListener(async function (message) {
        const clickedWord = message.word;
        if (clickedWord) {
            const elemData = {
                name: "tr",
                parent: "grabbed-words"
            }
            selectedWordElem.innerText = clickedWord;
            translatedWordElem.innerText = await getTranslation(urls, clickedWord);
            chrome.storage.sync.get(["words"], function (data) {
                const formattedWords = JSON.parse(data.words);
                generateElement(formattedWords, elemData)
            });
        }
    });
});

const getTranslation = async (urls, searchWord) => {
    const wordIdRes = await getData(`${urls.wordId}/${searchWord}`);
    const wordId = wordIdRes.words[0].wordId;
    const wordTransRes = await getData(`${urls.wordTranslation}/${wordId}/${urls.dict}`);
    const varLangWords = wordTransRes.lexemes[0].synonymLangGroups;
    const rusWords = varLangWords.filter(word => word.lang === "rus");
    return rusWords[0].synonyms[0].words[0].wordValue
}

delBtn.addEventListener("click", () => {
    chrome.storage.sync.set({'words': "[]"}, function() {
    });
    removeAllElements("grabbed-words");
});