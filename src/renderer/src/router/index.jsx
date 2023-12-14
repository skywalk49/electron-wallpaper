import { lazy } from "react"

const routes = [
    {
        path: "/",
        element: lazy(() => import('@/views/Index')),
    }
]

export default routes