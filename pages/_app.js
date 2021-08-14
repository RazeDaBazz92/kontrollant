import 'tailwindcss/tailwind.css'
import {createStore} from 'redux';
import allReducer from '../reducers';
import {Provider} from 'react-redux';

const store = createStore(
  allReducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

function MyApp({ Component, pageProps }) {
  return <Provider store = {store}><Component {...pageProps} /></Provider>
}

export default MyApp
