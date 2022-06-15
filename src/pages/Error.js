import React from 'react'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <div>
        <h3>Not found</h3>
        <Link to='/'>Back</Link>
    </div>
  )
}

export default Error