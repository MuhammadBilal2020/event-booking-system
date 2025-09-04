import React from 'react'

const SubmitButton = ({title}) => {
  return (
    <>
      <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold 
             border-b-[1px] border-transparent 
             hover:bg-white hover:text-black hover:border-black 
             transition duration-200" 
          >
            {title}
          </button>
    </>
  )
}

export default SubmitButton