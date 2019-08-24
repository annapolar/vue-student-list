import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

// Initialize your firebase app
firebase.initializeApp({
  projectId: 'student-list-e0e63',
  databaseURL: 'https://student-list-e0e63.firebaseio.com'
})
export const db = firebase.firestore()
