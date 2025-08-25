import  { Suspense } from 'react'
import { router } from './router/router'
import { RouterProvider } from 'react-router-dom'
import Loading from './components/Loading'


const App = () => {
  return (
      <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App