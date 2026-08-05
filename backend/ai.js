function generateAISummary(title, url, ocrText) {

    const text = `${title} ${url} ${ocrText}`.toLowerCase();

    let category = "Other";
    let activity = "Browsing";
    let productivity = "Neutral";

    if (text.includes("google")) {
        category = "Search Engine";
        activity = "Searching on Google";
    }

    else if (text.includes("youtube")) {
        category = "Entertainment";
        activity = "Watching YouTube";
        productivity = "Low";
    }

    else if (text.includes("gmail")) {
        category = "Communication";
        activity = "Reading Email";
        productivity = "High";
    }

    else if (
        text.includes("github") ||
        text.includes("stackoverflow") ||
        text.includes("chatgpt")
    ) {
        category = "Development";
        activity = "Software Development";
        productivity = "High";
    }

    else if (
        text.includes("leetcode") ||
        text.includes("geeksforgeeks")
    ) {
        category = "Learning";
        activity = "Programming Practice";
        productivity = "High";
    }

    else if (
        text.includes("linkedin")
    ) {
        category = "Professional";
        activity = "Professional Networking";
        productivity = "High";
    }

    const keywords = [];

    text.split(/\W+/).forEach(word => {

        if (
            word.length > 4 &&
            !keywords.includes(word)
        ) {
            keywords.push(word);
        }

    });

    return {

        activity,

        category,

        productivity,

        keywords: keywords.slice(0, 10),

        summary:
            `User was ${activity.toLowerCase()} in the ${category} category.`

    };

}

module.exports = generateAISummary;