import React from 'react'
function Headers() {
  return (
    <header>
      <h1>My Website</h1>

      <nav aria-label="Main navigation">
        <a href="https://www.google.com/search?q=claude&oq=claude&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiPAjIHCAIQABiPAjIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg80gEHOTEyajBqN6gCCLACAfEFVfPFUd2TpzE&sourceid=chrome&source=chrome.ob&ie=UTF-8">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Headers