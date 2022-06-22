import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "./firebase";

export const reauthenticate = (currentPassword) => {
    let user = auth.currentUser;

    let cred = EmailAuthProvider.credential(user.email, currentPassword);
    console.log(cred);
    return reauthenticateWithCredential(user, cred)
}