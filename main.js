import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, set, push } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyALwp27GSd6oQ4e18Uql4o-EDANgVmtbms",
    authDomain: "moonlight-project-b058f.firebaseapp.com",
    databaseURL: "https://moonlight-project-b058f-default-rtdb.firebaseio.com",
    projectId: "moonlight-project-b058f",
    storageBucket: "moonlight-project-b058f.appspot.com",
    messagingSenderId: "872347634357",
    appId: "1:872347634357:web:3ea2750d0d734d70e20cfc"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

async function searchUserByUsername(username) {
  try {
    const guildSnapshot = await get(ref(db, 'guild'));
    if (guildSnapshot.exists()) {
      const guildData = guildSnapshot.val();
      for (const memberId in guildData) {
        if (guildData[memberId].username === username) {
          return {
            [memberId]: guildData[memberId]
          };
        }
      }
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error)
    return null;
  }
}

const searchInput = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', () => {
  setTimeout(inputLogic, 700)
})

function inputLogic(){
  if(searchInput.value.trim() === ""){
    createDialog(false);
  }else if(searchInput.value.trim() !== ""){
    let searchInputValue = searchInput.value.trim();
    
    searchUserByUsername(searchInputValue).then(
      (user) => {
        if(user){
          const memberId = Object.keys(user)[0];
          const userData = user[memberId];
          createDialog(true, userData)
        }else if(!user){
          const userData = null;
          createDialog(true, userData);
        }
      })
    
    
  }
}


function createDialog(statut, userData){
  let warningMessage = "أدخل اللقب أولا!";
  let warningMessage2 = "لا يوجد عضو بهذا اللقب!";
  
  const searchArea = document.getElementById('search-area');
  const dialog = document.createElement('div');
  
  if(statut){
    
    if(userData == null){
      
    const paragraph = document.createElement('p');
    
    paragraph.textContent = warningMessage2;
    
    dialog.appendChild(paragraph);
  
    } else {
      
    const usernameParagraph = document.createElement('p');
    const balanceParagraph = document.createElement('p');
    const warningsParagraph = document.createElement('p');
    
    usernameParagraph.textContent = `مرحبا بك ${userData.username}`;
    balanceParagraph.textContent = `لديك ${userData.balance}`;
    warningsParagraph.textContent = `لديك ${userData.warnings}`;
    
    dialog.appendChild(usernameParagraph);
    dialog.appendChild(balanceParagraph);
    dialog.appendChild(warningsParagraph);
    
    }
  }else if (!statut){
    const paragraph = document.createElement('p');
    
    paragraph.textContent = warningMessage;
    
    dialog.appendChild(paragraph);
  }
    
  
  const confirmBtn = document.createElement('button');
  
  confirmBtn.textContent = "تأكيد";
  
  dialog.className = 'dialog';
  
  dialog.appendChild(confirmBtn);
  searchArea.appendChild(dialog);
  
  confirmBtn.addEventListener('click', () => {
    dialog.style.display = 'none';
  })
  
}