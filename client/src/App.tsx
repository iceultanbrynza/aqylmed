import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './features/dashboard/Dashboard';
import AIAgent from './features/ai-agent/AIAgent';
import './App.css';

function App() {

  return (
    <>
      <MantineProvider>
        <BrowserRouter>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-agent" element={<AIAgent />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
