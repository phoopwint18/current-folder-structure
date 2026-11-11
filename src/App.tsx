import { RouterProvider } from 'react-router-dom'
import { NVMToaster } from '@/common/components'
import { ROUTER } from '@/core/routes/route'

export default function App() {
  return (
    <>
      <RouterProvider router={ROUTER} />
      <NVMToaster />
    </>
  )
}
