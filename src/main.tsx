import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.tsx'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import './index.css'
import {AuthContextProvider} from './services/Auth.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Article from './pages/Articles.tsx'
import Composition from './pages/Composition.tsx'
import Profil from './pages/Profil.tsx'
import SocketNotifier from './components/SocketNotifier.tsx'


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Navbar/><Home /></div>,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/article",
    element:<div><Navbar/><Article/></div>,
  },
  {
    path:"/composition",
    element:<div className='h-full'><Navbar/><Composition/></div>,
  },
  {
    path: '/profil',
    element: <div className='h-[100rem]'><Navbar/><Profil/></div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <SocketNotifier/>
      <RouterProvider router = {router}/>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
