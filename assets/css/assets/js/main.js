// Año dinámico en el footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Chat IA (placeholder local)
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            // Mensaje del usuario
            addMessage("user", text);

            // Limpiar input
            chatInput.value = "";

            // Respuesta simulada (aquí luego se integraría la IA real)
            setTimeout(() => {
                const reply =
                    "Esta es una respuesta de ejemplo. " +
                    "En la versión completa, aquí se conectaría con un modelo de IA " +
                    "especializado en seguridad privada, convenio y normativa.";
                addMessage("bot", reply);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        });
    }

    function addMessage(role, text) {
        const div = document.createElement("div");
        div.classList.add("chat-message", role === "user" ? "user" : "bot");
        const p = document.createElement("p");
        p.textContent = text;
        div.appendChild(p);
        chatMessages.appendChild(div);
    }
});
