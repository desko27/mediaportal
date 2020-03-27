import React from 'react'

const { ipcRenderer } = window.require('electron')

const MainRoute = () => {
  const handleClick = () => {
    ipcRenderer.send('portal-resource', {
      message: 'this is crazy!'
    })
  }

  return (
    <div>
      <h1>MainRoute</h1>
      <button onClick={handleClick}>
        Send it!
      </button>
    </div>
  )
}

export default MainRoute
