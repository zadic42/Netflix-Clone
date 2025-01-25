import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import { addDoc, 
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAOLW3hluoVvJoR-RwcWFem5inxwJ-o6mQ",
  authDomain: "netflix-clone-75104.firebaseapp.com",
  projectId: "netflix-clone-75104",
  storageBucket: "netflix-clone-75104.firebasestorage.app",
  messagingSenderId: "878802513160",
  appId: "1:878802513160:web:fe96a1c0beb68a039a50bd"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name,email,password) => {
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email, 
    })
  } catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}


const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))

  }
}


const logout = () => {
  signOut(auth);
}


export {auth, db, login, signup, logout};