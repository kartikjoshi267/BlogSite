import React from 'react'
import { SubmitBtnProps } from '../constants/types'

const SubmitBtn : React.ElementType = ({
    text,
    handleSubmit,
    disabled
}: SubmitBtnProps) => {
  return (
    <>
        <button onClick={(e) => handleSubmit(e)} className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base mt-4 mx-2 md:mt-0" disabled={disabled}>{text}</button>
    </>
  )
}

export default SubmitBtn