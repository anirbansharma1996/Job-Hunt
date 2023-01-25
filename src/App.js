import './App.css';
import { Allroutes } from './Component/Allroutes';
import Footer from './Component/Pages/Footer';
import Navbar from './Component/Pages/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Allroutes/>
      <Footer/>
    </div>
  );
}

export default App;
