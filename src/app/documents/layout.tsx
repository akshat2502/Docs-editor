import React from 'react'

interface layoutProps {
  children: React.ReactNode
}

const layout = ({children}: layoutProps) => {
  return (
    <div>
        <nav className="bg-red-800 p-4 text-white"></nav>
        {children}
    </div>
  )
}

export default layout;
