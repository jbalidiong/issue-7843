import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

//Firebase Imports
import { initializeApp } from 'firebase/app';
import {set, ref, query, get, orderByChild, getDatabase} from 'firebase/database'

function App() {

  let firebaseApp;
  let firebaseDb;
  useEffect(() => {

    let firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    };
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth();
    firebaseDb = getDatabase();
  }, []);

  const setData = async (e) => {
    const data = {
      "posts": {
        "ts-functions": {
          "metrics": {
            "views": 1200000,
            "likes": 251000,
            "shares": 100,
          },
          "title": "Why you should use TypeScript for writing Cloud Functions",
          "author": "Doug",
        },
        "android-arch-3": {
          "metrics": {
            "views": 900000,
            "likes": 117000,
            "shares": 144,
          },
          "title": "Using Android Architecture Components with Firebase Realtime Database (Part 3)",
          "author": "Doug",
        }
      }
    }

  await set(ref(firebaseDb), data);
  let mostViewedPosts = query(ref(firebaseDb, 'posts'), orderByChild('metrics/views'));
  let snapshot = await get(mostViewedPosts);
  }
  return (
    <div className="App">
      <button onClick={setData}>Set Data</button>
    </div>
  );
}

export default App;
