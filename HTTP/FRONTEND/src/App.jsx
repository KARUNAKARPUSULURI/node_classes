import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(data => setData(data))
  }, [])
  return (
    <div>
      <table border={1} cellSpacing={0}>
        <thead>
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((user, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                </tr>
              </>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App