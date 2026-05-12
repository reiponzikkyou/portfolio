const IMAGE_FILE = "warning.png"; // 画像ファイル名を確認してください

chrome.storage.local.get(["startHour", "endHour", "isEnabled"], (result) => {
    // 厳格な判定：isEnabled が明示的に true でない限り、絶対に動かさない
    if (result.isEnabled !== true) {
        return; 
    }

    const startHour = result.startHour ?? 9;
    const endHour = result.endHour ?? 18;
    const now = new Date();
    const hour = now.getHours();

    // 指定時間内のときだけ実行
    if (hour >= startHour && hour < endHour) {
        showOverlay(startHour, endHour);
    }
});

function showOverlay(start, end) {
    const imageUrl = chrome.runtime.getURL(IMAGE_FILE);
    const overlay = document.createElement("div");
    
    Object.assign(overlay.style, {
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.95)", zIndex: "2147483647",
        display: "flex", flexDirection: "column", justifyContent: "center", 
        alignItems: "center", color: "white", textAlign: "center", fontFamily: "sans-serif"
    });

    overlay.innerHTML = `
        <img src="${imageUrl}" style="max-width: 80%; max-height: 50%; border-radius: 10px;">
        <h1 style="font-size: 24px; margin-top: 20px;">今は集中時間（${start}時〜${end}時）です</h1>
        <button id="close-button" style="
            margin-top: 30px; padding: 12px 30px; font-size: 16px; 
            cursor: pointer; background: #00ffcc; border: none; border-radius: 25px; font-weight: bold;
        ">わかった、作業に戻る</button>
    `;

    document.documentElement.appendChild(overlay);

    overlay.querySelector("#close-button").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "close_tab" });
    });
}