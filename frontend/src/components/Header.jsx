import React from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAuth from "../hooks/useAuth"
import Busqueda from './Busqueda'
const Header = () => {
  const {handleBuscador, cerrarSesionProyectos} = useProyectos()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = ()=>{
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
  }
  return (
    <header className='md:flex justify-between w-full bg-white p-5 items-center'>
        <h2 className='font-black text-sky-600 md:text-3xl text-2xl mb-4'>UpTask</h2>

        <div className='flex flex-col md:flex-row gap-3 items-center'>
            <button className='font-black uppercase'
            onClick={handleBuscador}
            >Buscar Proyecto</button>
            <Link to={"/proyectos"} className="font-black uppercase">Proyectos</Link>
            <button className='p-3 bg-sky-600 text-white rounded font-bold hover:bg-sky-800'
            onClick={handleCerrarSesion}
            >CERRAR SESIÓN</button>

            <Busqueda/>
        </div>
    </header>
  )
}

export default Header