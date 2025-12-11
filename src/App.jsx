import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import MainForm from "./form/MainForm"
import "./App.css"

function App() {
  const [members, setMembers] = useState([])

  return (
    <>
      <h1>KK sorter</h1>
      <MainForm />
    </>
  )
}

export default App
