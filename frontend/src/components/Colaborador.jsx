import React from 'react'
import useProyectos from '../hooks/useProyectos'
const Colaborador = ({colaborador}) => {
    const {nombre, email} = colaborador
    const {handleModalEliminarColaborador} = useProyectos()
  return (
    <div className='border-b flex justify-between items-center'>
        <div className='mb-2'>
            <p>{nombre}</p>
            <p className='text-sm text-gray-500 font-bold'>{email}</p>
        </div>
        <div>
            <button className='bg-red-600 font-bold text-white uppercase rounded p-2' type='button'
            onClick={()=> handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>
        </div>

    </div>
  )
}

export default Colaborador