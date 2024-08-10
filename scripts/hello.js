document.addEventListener("DOMContentLoaded", function() {
    let port = chrome.runtime.connect({name: "hello"});

    port.onMessage.addListener(function(message) {
        if (message.word) {
            document.getElementById("word").innerText = message.word;
        }
    });
});