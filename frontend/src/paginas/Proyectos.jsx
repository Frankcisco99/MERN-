import Proyecto from "../components/Proyecto"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"


const Proyectos = () => {
  const {proyectos, alerta} = useProyectos()


  const {msg} = alerta
  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      {msg && <Alerta alerta={alerta}/>}
      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ?
          proyectos.map(proyecto =>(
            <Proyecto
              key={proyecto._id}
              proyecto = {proyecto}
            />
          ))
        : <p className="text-center text-gray-600 uppercase">No hay proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos