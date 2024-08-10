let selectedWord = '';
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.word) {
        selectedWord = message.word;
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "hello") {
        port.postMessage({word: selectedWord});
    }
});