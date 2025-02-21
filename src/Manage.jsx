import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskBoard from "./components/Task";

initializeApp(firebaseConfig);
const auth = getAuth();

const Manage = () => {
  const [user, setUser] = useState(null);

  // Monitor authentication state
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

  return (
    <div>
      <Navbar user={user} />
      <div className="p-4">
        <h1 className="text-3xl italic font-serif m-5">Task List</h1>
        <TaskBoard user={user} />
        {!user && (
          <button className="btn bg-pink-600 text-white mt-4" onClick={handleLogin}>
            Login with Google
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Manage;
