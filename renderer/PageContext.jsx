export { PageContext, usePageContext }

import { createContext, useContext } from "react"

const PageContext = createContext({})
const usePageContext = () => useContext(PageContext)