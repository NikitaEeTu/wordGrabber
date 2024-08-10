document.addEventListener("click", function(event) {
    let selection = window.getSelection();
    let word = selection.toString().trim();

    if (word) {
        chrome.runtime.sendMessage({word: word});
    }
});