import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"} bg-gradient-to-br 
    w-100 text-white font-black p-3 text-center mt-5 rounded-lg`}>
        <p>{alerta.msg}</p>
    </div>
  )
}

export default Alerta