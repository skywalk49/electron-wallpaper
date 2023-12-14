import { Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import routes from "@/router/index.jsx"
import css from "@/styles/layout.module.less"

const AppContent = () => {
    return (
        <div className={css.content}>
            <Suspense fallback={<></>}>
                <Routes>
                    {routes.map((item) => {
                        return <Route key={item.path} path={item.path} name={item.name} element={<item.element />} />
                    })}
                </Routes>
            </Suspense>
        </div>
    )
}

export default AppContent