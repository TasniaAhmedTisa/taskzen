
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-red-100">
      <Navbar></Navbar>
      
        <Banner></Banner>
        <p className="text-sm md:text-lg lg:text-xl m-3 drop-shadow-md">
          Manage your tasks efficiently with TaskZen. Plan, track, and achieve your goals seamlessly.
        </p>
        {/* <button className="btn bg-pink-600 text-white mt-4" onClick={handleLogin}>
          Sign in with Google
        </button> */}
    
  
      <Footer></Footer>
    </div>
  );
};

export default App;
