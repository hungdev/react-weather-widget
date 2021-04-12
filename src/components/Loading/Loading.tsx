import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";
import './Loading.scss'

export default function Loading() {
  return (
    <div className='loading-container'>
      <PropagateLoader color={'#95E7D4'} loading={true} size={10} />
    </div>
  )
}
