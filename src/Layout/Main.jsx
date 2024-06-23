import { Outlet } from 'react-router-dom'
import Header from '../Pages/Header'

function Main() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default Main