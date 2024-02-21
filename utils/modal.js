 const modal = document.querySelector("#modal")
 const pModal = modal.querySelector("p")

 const showAlert = (text)=>{
    pModal.innerText = text
    modal.style.display = "flex"
 }

 const removeAlert = ()=>{
    modal.style.display ="none"
 }

 export {showAlert,removeAlert}