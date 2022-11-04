import { FunctionComponent } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { SkeletonWidthProvider } from './SkeletonWidth'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })

type Route = {
  name: string
  path: string
  component: FunctionComponent
}

const routes = Object.keys(pages)
  .map((path): Route | null => {
    const matches = path.match(/\.\/pages\/(.*)\.tsx$/)
    const name = matches && matches[1]
    const page = pages[path]
    if (name && isComponentExport(page)) {
      return {
        name,
        path: name === 'index' ? '/' : `/${name.toLowerCase()}`,
        component: page.default,
      }
    }
    return null
  })
  .filter(isRoute)

function isRoute(route: Route | null): route is Route {
  return route !== null
}

function isComponentExport(page: unknown): page is ComponentExport {
  return typeof (page as ComponentExport).default === 'function'
}

type ComponentExport = {
  default: (props: Record<string, unknown>) => JSX.Element
}

export function App() {
  return (
    <SkeletonWidthProvider>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>
        })}
      </Routes>
    </SkeletonWidthProvider>
  )
}
