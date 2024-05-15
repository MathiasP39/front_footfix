import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.tsx'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import './index.css'
import {AuthContextProvider} from './hooks/AuthHook.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Article from './pages/Article.tsx'


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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router = {router}/>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
