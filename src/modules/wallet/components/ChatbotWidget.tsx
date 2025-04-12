// components/ChatbotWidget.tsx
import { useEffect, useState } from 'react';

const SUGGESTIONS = [
  'How do I submit a project?',
  'What is the funding process?',
  'How does milestone-based release work?',
  'Can I edit my project after submission?',
  'How are projects verified?'
];

export default function ChatbotWidget() {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setHasWindow(true);
  }, []);

  const openChatTab = () => {
    if (!hasWindow) return;

    const chatWindow = window.open('', '_blank', 'width=400,height=600');
    if (!chatWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>AndroBot - Chat</title>
          <style>
            body { font-family: sans-serif; margin: 0; padding: 0; }
            .header { background-color: #2563eb; color: white; padding: 10px; font-weight: bold; text-align: center; }
            .chat-box { height: 400px; overflow-y: auto; padding: 10px; background-color: #f9fafb; }
            .message { margin: 5px 0; padding: 8px; border-radius: 8px; max-width: 80%; }
            .user { background-color: #e5e7eb; text-align: right; margin-left: auto; }
            .bot { background-color: #dbeafe; text-align: left; margin-right: auto; }
            .input-bar { display: flex; padding: 10px; border-top: 1px solid #ddd; }
            .input-bar input { flex: 1; padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
            .input-bar button { margin-left: 10px; padding: 5px 10px; }
            .suggestions { padding: 10px; background-color: #f3f4f6; border-top: 1px solid #ddd; }
            .suggestions button { margin: 5px; padding: 5px 10px; border: none; background: #fff; border-radius: 16px; cursor: pointer; border: 1px solid #2563eb; color: #2563eb; }
          </style>
        </head>
        <body>
          <div class="header">AndroBot</div>
          <div class="chat-box" id="chatBox"></div>
          <div class="suggestions" id="sugBox"></div>
          <div class="input-bar">
            <input type="text" id="chatInput" placeholder="Ask something..." />
            <button onclick="sendChat()">Send</button>
          </div>

          <script>
            const chatBox = document.getElementById('chatBox');
            const sugBox = document.getElementById('sugBox');
            const input = document.getElementById('chatInput');

            const suggestions = ${JSON.stringify(SUGGESTIONS)};

            const addMessage = (sender, text) => {
              const msg = document.createElement('div');
              msg.className = 'message ' + sender;
              msg.innerText = text;
              chatBox.appendChild(msg);
              chatBox.scrollTop = chatBox.scrollHeight;
            };

            const renderSuggestions = () => {
              sugBox.innerHTML = '';
              suggestions.forEach(s => {
                const btn = document.createElement('button');
                btn.innerText = s;
                btn.onclick = () => sendChat(s);
                sugBox.appendChild(btn);
              });
            };

            const sendChat = (presetText) => {
              const text = presetText || input.value;
              if (!text.trim()) return;
              addMessage('user', text);
              input.value = '';

              let response = '';
              switch (text.toLowerCase()) {
                case 'how do i submit a project?':
                  response = 'Go to the Submit Project page, fill out the details, and submit it for review.'; break;
                case 'what is the funding process?':
                  response = 'Supporters choose a tier and fund projects. Funds are released by milestones.'; break;
                case 'how does milestone-based release work?':
                  response = 'Creators define milestones. Funds are released when milestones are verified.'; break;
                case 'can i edit my project after submission?':
                  response = 'You can request edits before verification starts. After that, it’s locked.'; break;
                case 'how are projects verified?':
                  response = 'Community members and platform reviewers validate projects before approval.'; break;
                default:
                  response = \`I'm here to help! You asked: \"\${text}\". Let me look into that.\`;
              }
              setTimeout(() => addMessage('bot', response), 500);
              renderSuggestions();
            };

            addMessage('bot', 'Hi! How can I help you today?');
            renderSuggestions();
          </script>
        </body>
      </html>
    `;

    chatWindow.document.open();
    chatWindow.document.write(htmlContent);
    chatWindow.document.close();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={openChatTab}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        💬 Chat
      </button>
    </div>
  );
}
