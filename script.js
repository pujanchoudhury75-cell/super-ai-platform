chat'at'cide.createIcons();

function switchTab(tab) {
    ['view-chat', 'view-coding', 'view-image', 'view-agent'].forEach(v => {
        document.getElementById(v).classList.add('hidden');
    });
    if (tab === 'chat') {
        document.getElementById('tab-title').innerHTML = '🧠 Super AI Chat';
        document.getElementById('view-chat').classList.remove('hidden');
    } else if (tab === 'coding') {
        document.getElementById('tab-title').innerHTML = '💻 AI Coding Master';
        document.getElementById('view-coding').classList.remove('hidden');
        runLiveCode();
    } else if (tab === 'image') {
        document.getElementById('tab-title').innerHTML = '🎨 AI Image Generator';
        document.getElementById('view-image').classList.remove('hidden');
    } else if (tab === 'agent') {
        document.getElementById('tab-title').innerHTML = '🤖 Autonomous AI Agent';
        document.getElementById('view-agent').classList.remove('hidden');
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    const chatMessages = document.getElementById('chat-messages');

    chatMessages.insertAdjacentHTML('beforeend', `<div class="flex justify-end"><div class="bg-green-600 text-white p-4 rounded-2xl max-w-xl text-sm">${text}</div></div>`);
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Localhost / Render Backend URL
    const backendUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/chat'
        : '[https://super-ai-platform.onrender.com](https://super-ai-platform.onrender.com)'; // <-- Yahan apna Render Backend URL daalein

    try {
        const res = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        chatMessages.insertAdjacentHTML('beforeend', `<div class="flex items-start space-x-3 bg-gray-800/40 p-4 rounded-2xl border border-gray-800"><div class="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0"><i data-lucide="bot" class="w-5 h-5 text-white"></i></div><p class="text-sm text-gray-200 whitespace-pre-wrap">${data.reply}</p></div>`);
        lucide.createIcons();
    } catch(e) {
        chatMessages.insertAdjacentHTML('beforeend', `<div class="p-4 bg-red-900/20 text-red-300 text-xs rounded-xl">Server connection failed.</div>`);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(e) { if (e.key === 'Enter') sendMessage(); }

function runLiveCode() {
    const code = document.getElementById('code-editor').value;
    const iframe = document.getElementById('preview-frame');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open(); doc.write(code); doc.close();
}

async function generateImage() {
    const prompt = document.getElementById('image-prompt').value.trim();
    if (!prompt) return;
    const img = document.getElementById('generated-image');
    const ph = document.getElementById('image-placeholder');
    ph.innerText = 'Generating...';
    img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;
    img.onload = () => { img.classList.remove('hidden'); ph.classList.add('hidden'); };
}

async function runAgentTask() {
    const goal = document.getElementById('agent-goal').value.trim();
    if (!goal) return;
    const logs = document.getElementById('agent-logs');
    logs.innerHTML = `<p class="text-emerald-400">Agent started for: ${goal}</p>`;
    setTimeout(() => logs.innerHTML += `<p>Analyzing subtasks...</p>`, 800);
    setTimeout(() => logs.innerHTML += `<p class="text-green-400">Task completed successfully!</p>`, 1600);
}
