import "../styles/globals.css";
import { db, auth } from "../firebase";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    return async () => {
      if (user) {
        setDoc(
          doc(db, "users", user.uid),
          {
            email: user.email,
            lastSeen: serverTimestamp(),
            photoURL: user.photoURL,
          },
          { merge: true }
        );
      }
    };
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
