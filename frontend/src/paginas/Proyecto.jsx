import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAdmin from "../hooks/useAdmin"
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import Tarea from '../components/Tarea'
import Alerta from '../components/Alerta'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import Colaborador from '../components/Colaborador'

let socket;

const Proyecto = () => {
  const params = useParams()
  const {obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareasProyecto, actualizarTareasProyecto} = useProyectos()
  console.log(proyecto)
  const [modal, setModal] = useState(false)
  const admin = useAdmin()

  useEffect(()=>{
    obtenerProyecto(params.id)
  },[])
  if(cargando) return 'Cargando....'

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  },[])

  useEffect(()=>{
    socket.on('tarea agregada', tareaNueva =>{
      if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tareaElim =>{
      if(tareaElim.proyecto === proyecto._id){
        eliminarTareasProyecto(tareaElim)
      }
    })

    socket.on('tarea actualizada', tareaAct =>{
      if(tareaAct.proyecto._id === proyecto._id){
        actualizarTareasProyecto(tareaAct)
      }
    })

    socket.on('nuevo estado', tareaEst =>{
      if(tareaEst.proyecto._id === proyecto._id){
        cambiarEstadoTarea(tareaEst)
      }
    })
  })
  // useEffect(()=>{
  //   socket.on('respuesta', (persona)=>{
  //     console.log(persona)
  //   })
  // })

  const {msg} = alerta
  return (

    <>
      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>{proyecto.nombre}</h1>
        {admin && (
        <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <Link className='uppercase font-bold' to={`/proyectos/editar/${params.id}`}>Editar</Link>
        </div>
        )}
      </div>
      
      {admin && (
      <button className='flex gap-2 items-center bg-sky-400 text-white p-3 rounded font-bold mt-5 w-full md:w-auto justify-center hover:bg-sky-700'
      onClick={handleModalTarea}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Nueva Tarea
      </button>
      )}

      <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>
      <div className='bg-white rounded shadow mt-10'>
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map(tarea => (
            <Tarea key={tarea._id} tarea={tarea}/>
          ))
        ) : 'No hay tareas'}
      </div>
      {admin && (
      <>  
        <div className='flex justify-between mt-10 items-center'>
          <p className='font-bold text-xl'>Colaboradores</p>
          <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
          className="uppercase font-bold text-gray-400 hover:text-black"
          >Añadir</Link>
        </div>

        <div className='bg-white rounded shadow mt-10 p-5'>
          {proyecto.colaboradores?.length ? (
            proyecto.colaboradores?.map(colaborador => (
              <Colaborador key={colaborador._id} colaborador={colaborador}/>
            ))
          ) : 'No hay colaboradores'}
        </div>
      </>
      )}
      <ModalFormularioTarea/>
      <ModalEliminarTarea/>
      <ModalEliminarColaborador/>
    </>
  )
}

export default Proyecto