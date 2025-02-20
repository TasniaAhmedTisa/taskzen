import { useEffect, useState } from "react";
import TaskBoard from "./components/Task";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import { FcDebian } from "react-icons/fc";

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
    <div className="min-h-screen flex flex-col items-center p-5 bg-red-100 py-10">
      
      {user ? (
        <>
        <div className="flex">
      <FcDebian className="text-6xl mr-2" />
      <h1 className="text-5xl font-serif">TaskZen</h1>

      </div>
          <h1 className="text-3xl italic font-serif m-5">Task List</h1>

          <TaskBoard user={user} />
          <button className="btn btn-error mt-4" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
        <img src="https://i.ibb.co.com/yFHRHnCj/task-management.jpg" alt="" className="rounded-xl max-w-3xl" />
        <p className="text-xl italic font-serif mt-4">Easiest Way To Manage Your Task With TaskZen</p>

        <button className="btn bg-violet-600 text-white mt-4" onClick={handleLogin}>
          Sign in with Google
        </button>
        </>
      )}
    </div>
  );
};

export default App;
