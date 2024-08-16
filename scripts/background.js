let selectedWord = '';
let selectedWords = [];
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.word  !== '') {
        selectedWord = message.word;

        chrome.storage.sync.get(['words'], function(data) {
            let recivedData = data.words;
            if(recivedData === undefined){
                recivedData = []
            }

            recivedData = JSON.parse(recivedData);
            recivedData.push(selectedWord);
            selectedWords = recivedData;
            const convertedWords = JSON.stringify(recivedData)
            chrome.storage.sync.set({'words': convertedWords}, function() {
                console.log('Settings saved');
            });
        });
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "hello") {
        port.postMessage({word: selectedWord, words: selectedWords});
    }
});