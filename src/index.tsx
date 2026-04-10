import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { routes } from './routes'
import { store } from './store'
import { PATH_NAME } from './utils/constants'

const router = createBrowserRouter(routes, {
	basename: process.env.PUBLIC_PATH
		? process.env.PUBLIC_PATH
		: PATH_NAME.BASE,
})

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)
root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
