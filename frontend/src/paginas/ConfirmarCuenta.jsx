import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import clienteAxios from "../config/ClienteAxios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {
  const params = useParams()
  const {id} = params
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  useEffect(()=>{
    const confirmarCuenta = async ()=>{
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  },[])

  const {msg} = alerta
  return (
    <>
      <h1 className='text-3xl md:text-6xl capitalize font-black text-sky-500'>
      Confirma tú cuenta y comienza a crear tus <span className='text-slate-800'>proyectos</span>
      </h1>
      <div>
        <div className="bg-white p-5 mt-5">
        {msg && <Alerta alerta={alerta}/>}
        {cuentaConfirmada && (
          <Link to={"/"} className="block text-center text-slate-500 hover:text-slate-800 hover:cursor-pointer font-bold">
            Inicia Sesión
          </Link>
        )}
        </div>
      </div>
    </>
  )
}

export default ConfirmarCuenta