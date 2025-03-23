import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaCar, FaUtensils, FaUserAlt, FaRobot, FaTshirt } from "react-icons/fa";

const dummyCalendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

const dummySchedule = {
  1: [
    { id: 1, title: "Wash the dishes", icon: <FaUtensils className="inline-block mr-1" />, time: "11:00am - 12:00pm" },
    { id: 2, title: "Do the laundry", icon: <FaTshirt className="inline-block mr-1" />, time: "11:15am - 13:00pm" },
    { id: 3, title: "EV Charging", icon: <FaCar className="inline-block mr-1" />, time: "13am - 16pm" }
  ],
  15: [
    { id: 1, title: "Wash the dishes", icon: <FaUtensils className="inline-block mr-1" />, time: "11:00am - 12:00pm" },
    { id: 2, title: "EV Charging", icon: <FaCar className="inline-block mr-1" />, time: "13am - 16pm" }
  ]
};

const dummyChatMessages = [
  { id: 1, sender: "ai", text: "Hi, I’m AmpiFlowAgent. I’m here to help you optimize your energy usage." },
  { id: 2, sender: "ai", text: "Could you please share your plans and tasks for today?" },
  { id: 3, sender: "user", text: "Hi, sure. Today I need to wash the dishes, do the laundry, and at 17:00pm I’m driving into the city." }
];

const dummyStatsData = [
  { day: "Mon", usage: 400 },
  { day: "Tue", usage: 300 },
  { day: "Wed", usage: 500 },
  { day: "Thu", usage: 200 },
  { day: "Fri", usage: 278 },
  { day: "Sat", usage: 189 },
  { day: "Sun", usage: 239 }
];

function App() {
  const [activeTab, setActiveTab] = useState("scheduler");
  const [selectedDay, setSelectedDay] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(dummyChatMessages);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: chatInput };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");
    // Optionally: add AI response here.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center">
        <img src="https://i.ibb.co/Wvjt0jgh/ApliLogo.png" alt="AmpiFlow Logo" className="h-15 w-16 rounded-full border border-gray-200" />
        <h1 className="text-3xl font-extrabold text-gray-800 ml-4">AmpiFlow</h1>
      </header>

      <main className="p-6 max-w-screen-lg mx-auto">
        {/* Tabs Interface */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("scheduler")}
            className={`px-6 py-3 mx-2 rounded-full shadow-md text-xl font-semibold transition transform hover:scale-105 ${
              activeTab === "scheduler" ? "bg-[#32cdf2] text-white" : "bg-white text-[#32cdf2] border border-[#32cdf2]"
            }`}
          >
            ⚡ Schedule Planner
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-6 py-3 mx-2 rounded-full shadow-md text-xl font-semibold transition transform hover:scale-105 ${
              activeTab === "stats" ? "bg-[#32cdf2] text-white" : "bg-white text-[#32cdf2] border border-[#32cdf2]"
            }`}
          >
            📊 Daily energy usage
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "scheduler" ? (
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg p-4" style={{ height: "60vh" }}>
            {/* Calendar & Daily Schedule */}
            <div className="w-full md:w-1/2 p-4 border-r border-gray-200 overflow-auto">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">June</h2>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 mb-4 min-w-max">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                  {dummyCalendarDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`p-2 rounded-lg shadow-sm transition duration-150 hover:scale-105 ${
                        selectedDay === day ? "bg-[#32cdf2] text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {day}
                      {/* Dot indicator for days with events */}
                      {dummySchedule[day] && dummySchedule[day].length > 0 && (
                        <span className="block w-2 h-2 bg-red-500 rounded-full mt-1 mx-auto"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {selectedDay && (
                <div>
                  <h3 className="text-2xl font-bold mb-2">Schedule for Day {selectedDay}</h3>
                  <ul>
                    {(dummySchedule[selectedDay] || []).map((item) => (
                      <li key={item.id} className="flex items-center p-2 mb-2 bg-gray-50 rounded shadow">
                        <span className="text-[#32cdf2] text-xl">{item.icon}</span>
                        <span className="ml-2 text-lg">{item.title}</span>
                      </li>
                    ))}
                    {!(dummySchedule[selectedDay] || []).length && (
                      <li className="p-2 text-gray-600">No scheduled events for this day.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Chat Interface */}
            <div className="w-full md:w-1/2 p-4 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Chat Assistant</h2>
              <div className="flex-1 bg-gray-100 rounded-lg p-4 overflow-auto shadow-inner mb-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 p-3 rounded-xl shadow-sm max-w-xs ${
                      msg.sender === "user"
                        ? "bg-[#32cdf2] text-white self-end"
                        : "bg-white text-gray-800 self-start border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      {msg.sender === "user" ? <FaUserAlt className="mr-2" /> : <FaRobot className="mr-2" />}
                      <span>{msg.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#32cdf2]"
                />
                <button type="submit" className="bg-[#32cdf2] text-white font-semibold rounded-r-lg px-6 hover:bg-[#28a0c9] transition">
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          // Stats Tab
          <div className="bg-white rounded-xl shadow-lg p-6" style={{ height: "60vh" }}>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Energy Usage Stats & Money Saved</h2>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={dummyStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#32cdf2" activeDot={{ r: 8 }} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
