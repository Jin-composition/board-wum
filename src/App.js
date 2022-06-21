import { Routes, Route } from "react-router";
import "./App.css";
import List from "./pages/List";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
function App() {
  const [ip, setIp] = useState("");

  useEffect(() => {
    getIpClient();
  }, []);

  async function getIpClient() {
    const response = await axios.get("https://geolocation-db.com/json/");
    setIp(response.data.IPv4);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/write" element={<Write ip={ip} />} />
        <Route path="/update" element={<Write ip={ip} />} />
        <Route path="/detail/:id" element={<Detail ip={ip} />} />
        <Route path="/" element={<List ip={ip} />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
