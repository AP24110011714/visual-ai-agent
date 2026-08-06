document.getElementById("capture").addEventListener("click", async () => {

    try {

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        document.getElementById("output").innerHTML = `
            <p><b>Title:</b> ${tab.title}</p>
            <p><b>URL:</b> ${tab.url}</p>
        `;

        chrome.runtime.sendMessage(
            { action: "capture" },
            async (response) => {

                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    alert(chrome.runtime.lastError.message);
                    return;
                }

                if (!response) {
                    alert("No response received from background script.");
                    return;
                }

                if (!response.success) {
                    alert(response.error);
                    return;
                }

                const image = document.createElement("img");
                image.src = response.screenshot;
                image.style.width = "100%";
                image.style.marginTop = "10px";

                document.getElementById("output").appendChild(image);

                try {

                    const res = await fetch("http://localhost:5000/activity", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title: tab.title,
                            url: tab.url,
                            timestamp: new Date().toISOString(),
                            screenshot: response.screenshot
                        })
                    });

                    const result = await res.json();
                    console.log("Saved:", result);

                } catch (err) {
                    console.error("Backend Error:", err);
                }

            }
        );

    } catch (err) {
        console.error(err);
    }

});