import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/ClienteAxios"
const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: "Los passwords no son iguales",
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msg: "El password debe ser mayor a 6 caracteres",
        error: true
      })
      return
    }

    //Comprobacion correcta
    setAlerta({})
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta
  return (
    <>
      <h1 className='text-3xl md:text-6xl capitalize font-black text-sky-500'>crea tú cuenta y administra tus <span className='text-slate-800'>proyectos</span></h1>
      {msg && <Alerta alerta={alerta}/>}
      <form className='bg-white my-10 rounded p-5'
      onSubmit={handleSubmit}
      >
        <div className='mt-3'>
          <label htmlFor='nombre' className='block text-xl font-bold text-slate-600 uppercase'>Nombre</label>
          <input
            id='nombre'
            type="text"
            placeholder="Tú Nombre"
            className='border p-2 w-full mt-3 rounded bg-gray-100'
            value={nombre}
            onChange={e=> setNombre(e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <label htmlFor='email' className='block text-xl font-bold text-slate-600 uppercase'>Email</label>
          <input
            id='email'
            type="email"
            placeholder="Email de Ingreso"
            className='border p-2 w-full mt-3 rounded bg-gray-100'
            value={email}
            onChange={e=> setEmail(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <label htmlFor='password' className='block text-xl font-bold text-slate-600 uppercase'>Password</label>
          <input
            id='password'
            type="password"
            placeholder="Password de Ingreso"
            className='border p-2 w-full mt-3 rounded bg-gray-100'
            value={password}
            onChange={e=> setPassword(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <label htmlFor='password2' className='block text-xl font-bold text-slate-600 uppercase'>Confirmar Password</label>
          <input
            id='password2'
            type="password"
            placeholder="Confirmar Password"
            className='border p-2 w-full mt-3 rounded bg-gray-100'
            value={repetirPassword}
            onChange={e=> setRepetirPassword(e.target.value)}
          />
        </div>
        
        <input
          type="submit"
          value="Crear Cuenta"
          className="my-5 bg-sky-700 w-full py-3 rounded font-bold text-white hover:cursor-pointer hover:bg-sky-800 transition-all duration-1000"
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
          <Link to={"/"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link to={"/olvide-password"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            Olvide mi password
          </Link>
      </nav>
    </>
  )
}

export default Registrar