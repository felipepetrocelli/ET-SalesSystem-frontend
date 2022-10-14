import firebase from "firebase/app"
import 'firebase/auth'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyDJGlXg6xm5nU713WyQHeYoePNeNRBOipQ',
        authDomain: 'sales-2e234.firebaseapp.com',
        projectId: 'sales-2e234',
    })
}

export default firebase