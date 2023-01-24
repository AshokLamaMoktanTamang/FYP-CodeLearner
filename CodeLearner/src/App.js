// importing the router
import Router from './router'
import { store } from './store'
import { Provider } from 'react-redux'

// importing global style
import GlobalStyle from './themes/globalTheme'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  )
}

export default App
