import io  from "socket.io-client";
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/ClienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

export const ProyectosContext = createContext()

let socket;

const ProyectosProvider = ({children}) =>{
    const {auth} = useAuth()
    const navigate = useNavigate()
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)

        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    useEffect(()=>{
        const obtenerProyectos = async () =>{
            const token = localStorage.getItem('token')
            if(!token) return;

            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
               const {data} = await clienteAxios('/proyectos', config) 
               setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerProyectos()
    },[auth])

    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
      },[])

    const submitProyecto = async (proyecto) =>{
        if(proyecto.id){
            await editarProyecto(proyecto)
        }else{
            await crearProyecto(proyecto)
        }
    }

    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return;

            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: "Proyecto actualizado correctamente",
                error: false
            })
            
            setTimeout(()=>{
                setAlerta({})
                navigate('/proyectos')
            },4000)

        } catch (error) {
            console.log(error)   
        }
    }


    const crearProyecto = async proyecto =>{
        const token = localStorage.getItem('token')
        if(!token) return;

        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post('/proyectos', proyecto, config)

            setProyectos([...proyectos, data])

            setAlerta({
                msg: "Proyecto creado correctamente",
                error: false
            })
            
            setTimeout(()=>{
                setAlerta({})
                navigate('/proyectos')
            },4000)
        } catch (error) {
            console.log(error)
        }
    }



    const obtenerProyecto = async id =>{  
        setCargando(true)    
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally{
            setCargando(false)
        }
    }

    const eliminarProyecto = async id =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)
            setAlerta({
                msg : data.msg,
                error : false
            })

            const datosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(datosActualizados)

            setTimeout(()=>{
                setAlerta({})
                navigate('/proyectos')
            },4000)


        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () =>{
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async (tarea) =>{
        if(tarea?.id){
            await editarTarea(tarea)
            return
        }
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/tareas', tarea, config)
            setAlerta({})
            setModalFormularioTarea(false)

            //SOCKET IO
            socket.emit('crear tarea', data)
        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async tarea =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
           
            //SOCKET IO 
            socket.emit('actualizar tarea', data)
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }


    const handleModalEditarTarea = (tarea) =>{
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = (tarea) =>{
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            
            //SOCKET IO 
            socket.emit('eliminar tarea', data)                   
            setModalEliminarTarea(false)
            setTarea({})
        } catch (error) {
            console.log(error)
        }
    }

    const buscarColaborador = async email =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post("/proyectos/colaboradores", {email}, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }finally{
            setCargando(false)
        }
    }

    const agregarColaborador = async email =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({})

            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

            setColaborador({})
    }
    }

    const handleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () =>{

        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

            setProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({})

            setModalEliminarColaborador(false)
        } catch (error) {
            console.log(error)            
        }
        
    }

    const completarTarea = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return;
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            setTarea({})
            setAlerta({})

            //SOCKET
            socket.emit('cambiar estado', data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuscador = ()=>{
        setBuscador(!buscador)
    }

    const submitTareasProyecto = (tarea)=>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }

    const eliminarTareasProyecto = (tarea)=>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(proyectoState => proyectoState._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const actualizarTareasProyecto = (tarea)=>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const cambiarEstadoTarea = (tarea)=>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    const cerrarSesionProyectos = ()=>{
        setProyectos([])
        setProyecto({})
        setAlerta({})
    }
    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                handleModalEliminarTarea,
                modalEliminarTarea,
                eliminarTarea,
                buscarColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareasProyecto,
                actualizarTareasProyecto,
                cambiarEstadoTarea,
                cerrarSesionProyectos
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export default ProyectosProvider