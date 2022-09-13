import React from "react"
import axios from "axios"

const App = () => {

  const fetchData = () => {
    axios({
      method: "GET",
      url: "http://localhost:80/api/products",
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  fetchData()

  return (
    <h1>Axios</h1>
  )
}

export default App
