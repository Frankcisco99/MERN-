import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "./Alerta"
import useProyectos from "../hooks/useProyectos"
const FormularioProyecto = () => {
    const {proyecto} = useProyectos()
    const {alerta, mostrarAlerta, submitProyecto} = useProyectos()
    const [nombre, setNombre] = useState('')
    const [id, setId] = useState(null)
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    useEffect(()=>{
        if(params.id){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    },[params])



    const handleSubmit = async (e) =>{
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: "Todos los campos son necesarios",
                error: true
            })
            return;
        }

        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    const {msg} = alerta
  return (

    
    <form className='bg-white px-5 py-10 md:w-1/2 rounded shadow'
    onSubmit={handleSubmit}
    >
    {msg && <Alerta alerta={alerta}/>}
        <div>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='nombre'
            >Nombre Proyecto</label>
            <input
                id='nombre'
                type="text"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className='mt-2'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='descripcion'
            >Descripcion</label>
            <textarea
                id='descripcion'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <div className='mt-2'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='fecha'
            >Fecha Entrega</label>
            <input
                id='fecha'
                type="date"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className='mt-2'>
            <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='cliente'
            >Cliente</label>
            <input
                id='cliente'
                type="text"
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div>

        <input
            type={"submit"}
            value={id ? "Editar Proyecto" : "Crear Proyecto"}
            className='w-full bg-sky-600 text-white font-bold p-3 rounded mt-5 cursor-pointer
            hover:bg-sky-700'
        />
    </form>
  )
}

export default FormularioProyecto