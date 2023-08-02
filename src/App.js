import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {

  return <Provider store={store}>
    <div className='flex justify-between flex-col min-h-[100vh] bg-blue-50'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  </Provider>

}



export default App;
