// importing the router
import Router from './router'
import { store } from './store'
import { Provider } from 'react-redux'
import { Worker } from '@react-pdf-viewer/core'

// importing global style
import GlobalStyle from './themes/globalTheme'

function App() {
  return (
    <Provider store={store}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js" />
      <GlobalStyle />
      <Router />
    </Provider>
  )
}

export default App
