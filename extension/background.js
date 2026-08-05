chrome.runtime.onInstalled.addListener(() => {
    console.log("Visual AI Agent Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "capture") {

        chrome.tabs.captureVisibleTab(
            null,
            { format: "png" },
            (dataUrl) => {

                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    sendResponse({
                        success: false,
                        error: chrome.runtime.lastError.message
                    });
                    return;
                }

                sendResponse({
                    success: true,
                    screenshot: dataUrl
                });

            }
        );

        return true;
    }

});