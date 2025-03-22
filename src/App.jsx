import React, { useState } from "react";

import {
    Tabs,
    Card,
    Button,
    TextArea
} from "@radix-ui/themes";
import Calendar from 'react-calendar'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaCar, FaUtensils } from "react-icons/fa";
import './App.css'
import 'react-calendar/dist/Calendar.css'

const energyData = [
  { name: "Mon", usage: 30 },
  { name: "Tue", usage: 25 },
  { name: "Wed", usage: 20 },
  { name: "Thu", usage: 22 },
  { name: "Fri", usage: 28 },
  { name: "Sat", usage: 26 },
  { name: "Sun", usage: 19 },
];

export default function EnergySchedulerApp() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dailySchedule = [
    { time: "11:00 AM - 12:00 PM", task: "Dishwasher", icon: <FaUtensils /> },
    { time: "1:00 PM - 4:00 PM", task: "EV Charging", icon: <FaCar /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
          <img className="logo" src="/public/logo.png" alt="logo" />
          Smart Energy. Maximum Flow.
      </h1>
      <h2 className="text-3xl font-bold mb-6 text-center">AI Energy Scheduler</h2>
      <Tabs.Root defaultValue="scheduler" className="w-full max-w-5xl mx-auto">
        <Tabs.List className="grid w-full grid-cols-2 mb-6">
          <Tabs.Trigger value="scheduler">🧠 AI Scheduler</Tabs.Trigger>
          <Tabs.Trigger value="stats">📊 Stats</Tabs.Trigger>
        </Tabs.List>

        {/* Scheduler Tab (Calendar + Chat Combined) */}
        <Tabs.Content value="scheduler">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
{/*             <Card> */}
{/*               <Card.Content className="p-4"> */}
                <h2 className="text-xl font-semibold mb-4">Schedule Overview</h2>
                <Calendar value={selectedDate} onChange={setSelectedDate} />

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Schedule for {selectedDate.toDateString()}:</h3>
                  <ul className="space-y-2">
                    {dailySchedule.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 bg-white p-2 rounded shadow">
                        <div className="text-xl">{item.icon}</div>
                        <div>
                          <div className="font-medium">{item.task}</div>
                          <div className="text-sm text-gray-600">{item.time}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
{/*               </Card.Content> */}
{/*             </Card> */}

            {/* Chat Interface */}
{/*             <Card> */}
{/*               <Card.Content className="p-4"> */}
                <h2 className="text-xl font-semibold mb-4">Ask AI for Schedule Optimization</h2>
                <TextArea rows={4} placeholder="e.g., Optimize my energy usage for weekdays after 6 PM..." />
                <Button className="mt-2">Send</Button>
                <div className="mt-4 bg-gray-100 p-3 rounded text-sm">
                  <p><strong>AI:</strong> I've adjusted your schedule to avoid peak hours and maximize efficiency.</p>
                </div>
{/*               </Card.Content> */}
{/*             </Card> */}
          </div>
        </Tabs.Content>

        {/* Stats Tab */}
        <Tabs.Content value="stats">
{/*           <Card> */}
{/*             <Card.Content className="p-4"> */}
              <h2 className="text-xl font-semibold mb-4">Energy Usage Stats & Money Saved</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#1F7A8C" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
{/*             </Card.Content> */}
{/*           </Card> */}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}