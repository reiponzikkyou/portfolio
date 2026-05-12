// 画像のURLを取得（manifestで許可したファイル名）
const imageUrl = chrome.runtime.getURL("warning.png");

// 画面を覆うオーバーレイ要素を作成
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.backgroundColor = "rgba(0,0,0,0.9)";
overlay.style.zIndex = "2147483647"; // 最前面に表示
overlay.style.display = "flex";
overlay.style.flexDirection = "column";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.color = "white";
overlay.style.fontFamily = "sans-serif";

// 画像とテキストを追加
overlay.innerHTML = `
    <img src="${imageUrl}" style="max-width: 80%; max-height: 60%; margin-bottom: 20px;">
    <h1 style="font-size: 24px;">今は作業の時間ではありませんか？</h1>
    <button id="close-overlay" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">
        わかった、作業に戻る
    </button>
`;

// ページに挿入
document.documentElement.appendChild(overlay);

// ボタンを押した時の処理
overlay.querySelector("#close-overlay").addEventListener("click", () => {
    // background.js に「このタブを閉じて」と命令を送る
    chrome.runtime.sendMessage({ action: "close_tab" });
});
