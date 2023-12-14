import { Routes, Route, HashRouter } from "react-router-dom"
import Layout from "@/layout/Layout"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </HashRouter>
  )
}

export default App