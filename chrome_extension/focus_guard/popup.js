chrome.storage.local.get(["startHour", "endHour", "isEnabled"], (result) => {
    document.getElementById("startHour").value = result.startHour ?? 9;
    document.getElementById("endHour").value = result.endHour ?? 18;
    // デフォルトをfalse(OFF)にしておき、保存された値があればそれに従う
    document.getElementById("isEnabled").checked = result.isEnabled === true;
});

document.getElementById("saveBtn").addEventListener("click", () => {
    const start = parseInt(document.getElementById("startHour").value);
    const end = parseInt(document.getElementById("endHour").value);
    const enabled = document.getElementById("isEnabled").checked;

    chrome.storage.local.set({ 
        startHour: start, 
        endHour: end, 
        isEnabled: enabled 
    }, () => {
        const btn = document.getElementById("saveBtn");
        btn.innerText = "保存完了！";
        setTimeout(() => { btn.innerText = "設定を保存"; }, 1000);
    });
});