import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

function ChatWidget({ onViewDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I'm Lumi! Ask me to find a product, get a recommendation, or check an order.", products: [] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message whenever the list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text, products: [] }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply, products: data.products || [] },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again.", products: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-white shadow-xl transition hover:bg-rose-600"
        aria-label="Chat with Lumi"
        >
        <MessageCircle size={24} />
        </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[80] flex h-[26rem] max-h-[70vh] w-[20rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 bg-gray-900 px-5 py-4">
            <div>
                <p className="text-xs uppercase tracking-[0.25em] text-rose-300">
                Lakmé Assistant
                </p>
                <h2 className="text-lg font-semibold text-white">Chat with Lumi</h2>
            </div>

            <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded-full p-2 text-rose-200 transition hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
            >
                <X size={20} />
            </button>
            </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-gray-900 text-white"
                      : "bg-stone-100 text-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.products.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            onViewDetails(product);
                            setIsOpen(false);
                          }}
                          className="block w-full cursor-pointer rounded-lg bg-white px-3 py-2 text-left text-xs text-rose-600 shadow-sm transition hover:bg-rose-50"
                        >
                          {product.name} — Rs. {product.price}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-stone-100 px-4 py-2 text-sm text-gray-500">
                  Lumi is typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-stone-100 px-3 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask Lumi something..."
              className="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm outline-none focus:border-rose-300"
            />
            <button
              onClick={sendMessage}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-rose-600"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatWidget;