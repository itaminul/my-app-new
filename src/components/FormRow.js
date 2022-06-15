import React from 'react'

function FormRow({type,name,value,handleChange,lableText}) {
  return (
    <div>
        <div>
          <label>
              {lableText || name}
          </label>
          <input
           type={type}
           name={name}
           value={value}
           onChange={handleChange} />
        </div>
    </div>
  )
}

export default FormRow