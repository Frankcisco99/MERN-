import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
const RutaProtegida = () => {
    const {auth, cargando} = useAuth()

    if(cargando) return "Cargando"
  return (
    <div>
        {auth._id? (
          <div>
              <Header/>
              <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="p-10 flex-1">
                  <Outlet/>
                </main>
              </div>
          </div>

        ) : <Navigate to={'/'}/>}

    </div>
  )
}

export default RutaProtegida