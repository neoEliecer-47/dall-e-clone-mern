import {Link, Route, Routes } from 'react-router-dom'

import { logo } from './assets'

import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

const App = () => {//el app siempre sera nuestra layout. por donde debemos empezar porque primero va la estructura de nuestra app
  
  console.log(window.innerWidth, window.innerHeight)
  return (
      <>
      
          <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b-4 border-b-[#e6ebf4]'>
              <Link to='/'>
                <img src={logo} alt="logo" className='w-28 object-contain' />
              </Link>

              <Link to="/create-post" className='font-inter font-medium bg-[#6a69ff] text-white px-4 py-2 rounded-md'>
              Crear
              </Link>
          </header>

          <main className='sm:p-8 p-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
              <Routes>
                <Route path='/' element={ <Home /> }></Route>
                <Route path='/create-post' element={ <CreatePost /> }></Route>
              </Routes>
          </main>
      
      </>
  )
}

export default App