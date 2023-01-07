import useProyectos from '../hooks/useProyectos'
import { formatearFecha } from '../helpers/formatearFecha'
import useAdmin from "../hooks/useAdmin"
const Tarea = ({tarea}) => {
    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()
    const {descripcion, nombre, prioridad, fechaEntrega, _id, estado, completado} = tarea
    const admin = useAdmin()
  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div className='flex flex-col items-start'>
            <p className='mb-2 text-xl'>{nombre}</p>
            <p className='mb-2 text-sm font-bold text-gray-600 uppercase'>{descripcion}</p>
            <p className='mb-2 text-xl'>{formatearFecha(fechaEntrega)}</p>
            <p className='mb-2 text-sm text-gray-600 uppercase'>Prioridad: {prioridad}</p>
            {estado && <p className='text-xs bg-green-400 text-white font-bold p-2 rounded-lg'>Completado por: {completado.nombre}</p>}
        </div>
        <div className='flex flex-col lg:flex-row gap-2'>
          {admin && (
          <button
          className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          onClick={()=> handleModalEditarTarea(tarea)}
          >Editar</button>
          )}
          
          <button
            className={`${estado? 'bg-sky-600' : 'bg-gray-600'}  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
            onClick={()=> completarTarea(_id)}
          >{estado? 'Completa' : 'Incompleta'}</button>

          {admin && (
          <button
          className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          onClick={ ()=> handleModalEliminarTarea(tarea) }
          >Eliminar</button>
          )}
        </div>
    </div>
  )
}

export default Tarea