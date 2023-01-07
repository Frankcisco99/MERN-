import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/ClienteAxios"
const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()
    if(email === "" || email.length < 6){
      setAlerta({
        msg: "El email es obligatorio",
        error: true
      })

      return;
    }

    try {
      const url = `/usuarios/olvide-password`
      const {data} = await clienteAxios.post(url, {email})

      setAlerta({
        msg: data.msg,
        error: false
      })

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
      <h1 className='text-3xl md:text-6xl capitalize font-black text-sky-500'>recupera tú acceso y no pierdas tus <span className='text-slate-800'>proyectos</span></h1>
      {msg && <Alerta alerta={alerta}/>}
      <form className='bg-white my-10 rounded p-5' onSubmit={handleSubmit}>
        <div className='mt-3'>
          <label htmlFor='email' className='block text-xl font-bold text-slate-600 uppercase'>Email</label>
          <input
            id='email'
            type="email"
            placeholder="Email de Ingreso"
            className='border p-2 w-full mt-3 rounded bg-gray-100'
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
        </div>
        
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="my-5 bg-sky-700 w-full py-3 rounded font-bold text-white hover:cursor-pointer hover:bg-sky-800 transition-all duration-1000"
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
          <Link to={"/"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link to={"/registrar"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
          ¿No tienes una cuenta? Registrate
          </Link>
      </nav>
    </>
  )
}

export default OlvidePassword