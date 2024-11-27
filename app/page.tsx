"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState({ cpuLoad: "", batteryStatus: "", apacheStatus: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Raspberry Pi Stats</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="bg-gray-100 p-6 rounded shadow-md text-lg">
          <li>
            <strong>CPU Load:</strong> {stats.cpuLoad || "Loading..."}
          </li>
          <li>
            <strong>Battery Status:</strong> {stats.batteryStatus || "Loading..."}
          </li>
          <li>
            <strong>Apache Server:</strong> {stats.apacheStatus || "Loading..."}
          </li>
        </ul>
      )}
    </div>
  );
}
