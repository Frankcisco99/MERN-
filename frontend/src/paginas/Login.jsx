import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/ClienteAxios'
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth, cargando } = useAuth();  
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
      e.preventDefault()

      if([email, password].includes('')){
        setAlerta({
          msg: "Todos los campos son necesarios",
          error: true
        })

        return
      }

      try {
        const {data} = await clienteAxios.post("/usuarios/login", {email, password})
        setAlerta({})
        localStorage.setItem('token', data.token)
        setAuth(data)
        navigate("/proyectos")
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
      <h1 className='text-3xl md:text-6xl capitalize font-black text-sky-500'>inicia sesión y administra tus <span className='text-slate-800'>proyectos</span></h1>

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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        
        <input
          type="submit"
          value="Iniciar Sesión"
          className="my-5 bg-sky-700 w-full py-3 rounded font-bold text-white hover:cursor-pointer hover:bg-sky-800 transition-all duration-1000"
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
          <Link to={"registrar"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link to={"olvide-password"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            Olvide mi password
          </Link>
      </nav>
    </>
  )
}

export default Login