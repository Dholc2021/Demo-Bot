const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    let userText = userInput.value.trim();
    if (userText === "") return;

    appendMessage("user", userText);
    userInput.value = "";

    try {
        const response = await fetch("hhttps://demo-kybbzo399-daniel-holcombs-projects.vercel.app/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        appendMessage("bot", data.reply);
    } catch (error) {
        appendMessage("bot", "Oops! Something went wrong.");
        console.error("Error:", error);
    }
}
