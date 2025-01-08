import { Fragment, ReactElement } from 'react'
import NavigationBar from './navigationBar'
import { Outlet } from 'react-router-dom'

function Layout(): ReactElement {
  return (
    <Fragment>
      {/* <NavigationBar/> */}
      <div id="container">
        <Outlet></Outlet>
      </div>
    </Fragment>
  )
}

export default Layout