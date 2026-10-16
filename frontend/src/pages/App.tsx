import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

function App() {
// Página intermédia onde definimos a estrutura do site
// Pq como temos o menu e o footer que são estáticos, não tem
// Sentido estar a mete-los em todas as Pages
// Outlet é um componente do React Router que é responsável de
// Renderizar as páginas child, neste caso todas as páginas são child.
  return (
    <>

    <Navbar />
    <div className='container max-w-6xl mx-auto px-10 xl:px-0'>
      <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default App
