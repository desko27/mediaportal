import { createRoot } from 'react-dom/client'

import './styles/colors.css'
import './styles/global.css'

import ReactApp from './react/ReactApp'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)
root.render(<ReactApp />)
