
import { generateElement, removeAllElements } from "./helper.js";
const delBtn = document.querySelector("#delBtn");
document.addEventListener("DOMContentLoaded", function() {
    let port = chrome.runtime.connect({name: "hello"});

    port.onMessage.addListener(function(message) {
        if (message.word) {
            const elemData = {
                name: "p",
                parent: "grabbed-words"
            }
            document.getElementById("word").innerText = message.word;
            chrome.storage.sync.get(['words'], function(data) {
                const formattedWords = JSON.parse(data.words);
                generateElement(formattedWords, elemData)
            });
        }
    });
});
delBtn.addEventListener("click", () => {
    chrome.storage.sync.set({'words': "[]"}, function() {
    });
    removeAllElements("grabbed-words");
});
