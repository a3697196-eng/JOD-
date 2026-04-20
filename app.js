import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LOGIN
window.login = async function () {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    document.getElementById("userInfo").innerText =
      "Logged in: " + user.email;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      balance: 0
    });

  } catch (err) {
    alert("Login Error");
    console.log(err);
  }
};

// QR GENERATE
window.generateQR = function () {
  const amount = document.getElementById("amount").value;

  if (!amount) {
    alert("Enter amount");
    return;
  }

  const upi = `upi://pay?pa=yourupi@bank&pn=GrowUpSMM&am=${amount}&cu=INR`;

  QRCode.toCanvas(document.getElementById("qr"), upi);
};
