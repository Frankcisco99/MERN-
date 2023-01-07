import {useState} from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
const FormularioColaborador = () => {
  const [email, setEmail] = useState('')
  const {mostrarAlerta, alerta, buscarColaborador} = useProyectos()
  const handleSubmit = e =>{
    e.preventDefault()

    if(email === ''){
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true
      })

      return
    }

    buscarColaborador(email)
  }

  const {msg} = alerta
  return (
    <form className='bg-white rounded shadow md:w-1/2 px-5 py-10' onSubmit={handleSubmit}>
      {msg && <Alerta alerta={alerta}/>}
      <div className='my-5'>
        <label className='font-bold' htmlFor='email'>Email Colaborador</label>
        <input
            placeholder='Ingresa Email Usuario'
            type='email'
            name='email'
            id='email'
            className="border-2 w-full placeholderbg-gray-600 p-2 mt-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
      </div>
      <input
        type={'submit'}
        className="bg-sky-600 hover:bg-sky-700 text-white uppercase font-bold
        p-2 w-full hover:cursor-pointer"
        value= 'Agregar Colaborador'
      />
    </form>
  )
}

export default FormularioColaborador