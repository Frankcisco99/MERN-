import {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/ClienteAxios'
import Alerta from '../components/Alerta'
const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordValido, setPasswordValido] = useState(false)
  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const comprobarToken = async ()=>{
        try {
          const url = `/usuarios/olvide-password/${token}`
          const {data} = await clienteAxios(url)
          setTokenValido(true)
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
    }
    comprobarToken()
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault()
  
    if(password.length < 6){
      setAlerta({
        msg: "El password debe ser minimo de 6 caracteres",
        error: true
      })
      return;
    }

    try {
      
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})

      setAlerta({
        msg: data.msg,
        error:false
      })

      setPassword('')
      setPasswordValido(true)
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
      <h1 className='text-3xl md:text-6xl capitalize font-black text-sky-500'>reestablece tú password y no pierdas acceso a tus <span className='text-slate-800'>proyectos</span></h1>
      {msg && <Alerta alerta={alerta}/>}
      {tokenValido && (
          <form className='bg-white my-10 rounded p-5' onSubmit={handleSubmit}>
            <div className='mt-5'>
              <label htmlFor='password' className='block text-xl font-bold text-slate-600 uppercase'>Nuevo Password</label>
              <input
                id='password'
                type="password"
                placeholder="Ingresa tú nuevo password"
                className='border p-2 w-full mt-3 rounded bg-gray-100'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            
            <input
              type="submit"
              value="Guardar Password"
              className="my-5 bg-sky-700 w-full py-3 rounded font-bold text-white hover:cursor-pointer hover:bg-sky-800 transition-all duration-1000"
            />
        </form>
      )}

      {passwordValido && (
        <Link to={"/"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            Inicia Sesión
          </Link>
      )}
    </>
  )
}

export default NuevoPassword