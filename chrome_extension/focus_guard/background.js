chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "close_tab") {
        // 命令を送ってきたタブ（SNSを開いているタブ）を閉じる
        chrome.tabs.remove(sender.tab.id);
    }
});