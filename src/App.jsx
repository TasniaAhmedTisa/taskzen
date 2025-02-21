
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-red-100">
      <Navbar></Navbar>
      
        <Banner></Banner>
        
    
  
      <Footer></Footer>
    </div>
  );
};

export default App;
