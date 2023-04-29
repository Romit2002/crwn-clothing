import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBTOgC-zDMWvnDXrAgdDELpEShK2ym2fP4",
    authDomain: "crwn-clothing-db-a30c1.firebaseapp.com",
    projectId: "crwn-clothing-db-a30c1",
    storageBucket: "crwn-clothing-db-a30c1.appspot.com",
    messagingSenderId: "485544723048",
    appId: "1:485544723048:web:e80082dc3b4fa25f0af1dd"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocumnets = async(collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());

      batch.set(docRef, object);

    });

    await batch.commit();
    console.log('done!!');
  }

  // To get the shop data into firebase
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  }

  export const createUserDocumentfromAuth = async(userAuth, additionalInformation = {}) =>{

    if(!userAuth) return;

    const userDocRef = doc(db,'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {email, displayName} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation,
                });
        }catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userDocRef;
  };

export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password){
    return;
  }

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password){
    return;
  }

  return signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = () => signOut(auth);

export const onAuthStateChangedListner = (callback) =>{
  onAuthStateChanged(auth, callback);
}



