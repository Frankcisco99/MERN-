import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
const Proyecto = ({proyecto}) => {
    const {auth} = useAuth()
    const {_id, nombre, cliente, creador} = proyecto
  return (
    <div className='flex flex-col md:flex-row border-b justify-between mb-2'>
        <div className='flex items-center gap-2'>
          <p className='text-lg font-bold'>{nombre} {' '} <span className='text-sm font-bold text-gray-600'>({cliente})
          </span></p>
          {auth._id !== creador &&
          (<p className='text-sm text-white p-1 rounded-lg bg-green-400 font-bold'> Colaborador</p>)
          }
        </div>
        <Link to={_id} className="font-bold text-gray-500 hover:text-gray-800">Ver Proyecto</Link>
    </div>
  )
}

export default Proyecto