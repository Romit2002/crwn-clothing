import './categories.styles.scss'
import Home from './routes/home/home.component';
import { Route, Routes} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop-page/shop.component';
import CheckOut from './routes/check-out/check-out.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop/>} />
        <Route path='auth' element={<Authentication/>}/>
        <Route path='checkout' element={<CheckOut/>} />
        </Route>
    </Routes>
  
  );
};

export default App;
