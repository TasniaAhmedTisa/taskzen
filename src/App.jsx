import { useEffect, useState } from "react";
import TaskBoard from "./components/Task";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const App = () => {
  const [user, setUser] = useState(null);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-red-100">
      <Navbar></Navbar>
      {user ? (
        <>
        
          <h1 className="text-3xl italic font-serif m-5">Task List</h1>

          <TaskBoard user={user} />
          <button className="btn bg-pink-400 mt-4" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
        <Banner></Banner>
        <p className="text-sm md:text-lg lg:text-xl m-3 drop-shadow-md">
          Manage your tasks efficiently with TaskZen. Plan, track, and achieve your goals seamlessly.
        </p>
        <button className="btn bg-pink-600 text-white mt-4" onClick={handleLogin}>
          Sign in with Google
        </button>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default App;
