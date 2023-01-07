import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import FormularioColaborador from "../components/FormularioColaborador"
import Alerta from "../components/Alerta"
const NuevoColaborador = () => {
  const {obtenerProyecto, cargando, proyecto, colaborador, agregarColaborador, alerta} = useProyectos()
  const params = useParams()
  useEffect(()=>{
    obtenerProyecto(params.id)
  },[])


  if(!proyecto?._id) return <Alerta alerta={alerta}/>
  return (
    <>
        <h1 className="text-4xl font-black">Añadir Colaborador(a) a {proyecto.nombre}</h1>

        <div className="mt-10 flex justify-center">
            <FormularioColaborador/>
        </div>

        {cargando ? <p>Cargando.....</p> : colaborador?._id && (
          <div className="bg-white rounded shadow md:w-1/2 m-auto mt-10 p-10">
            <h2 className="text-center font-bold text-2xl">Resultados</h2>
            <div className="flex items-center mt-5 justify-between">
              <p className="font-bold">{colaborador.nombre}</p>
              <button className="bg-indigo-500 text-white uppercase font-bold p-2 rounded"
              type="button"
              onClick={()=> agregarColaborador({email: colaborador.email})}
              >Agregar Colaborador</button>
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador