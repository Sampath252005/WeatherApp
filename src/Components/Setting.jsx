import React from 'react'
import PropTypes from 'prop-types'

function Setting({onClose}) {
  return (
    <div className="fixed right-0 top-0 w-1/2 md:w-1/4 sm:w-full h-full bg-slate-800 shadow-lg p-4 border-amber-50 border-2 text-white">
        <div className='flex justify-between items-center'>
     <h2 className="min-text-2xl md:text-3xl font-extrabold">Settings</h2>
    <button className=" bg-gray-700 text-white rounded-md mb-2 min-w-15 min-h-10 font-bold hover:bg-slate-500 min-text-3xl" onClick={onClose}>Close</button>
    </div>
   
  </div>
  )
}

Setting.propTypes = {

}

export default Setting

