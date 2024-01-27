function Validation({ firstName, lastName, email, password}, type){
    let errors = []
   if (type === "register"){
    if (!firstName) {
      errors.push({ key: "firstName", message: "Requied Field Firstname is Empty" })
  } else if (!(/^[A-Za-z]+$/.test(firstName))) {
      errors.push({ key: "firstName", message: "firstName must contain at least 3 letters without numbers"})
  }
  if (!lastName) {
    errors.push({ key: "lastName", message: "Requied Field lastName is Empty" })
} else if (!(/^[A-Za-z]+$/.test(lastName))) {
    errors.push({ key: "lastName", message: "lirstName must contain at least 3 letters without numbers" })
}

if (!email) {
    errors.push({ key: "email", message: "Requied Field Email is Empty" })
} else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
    errors.push({ key: "email", message: "Invalid Email" })
}
if (!password) {
    errors.push({ key: "password", message: "Requied Field Password is Empty" })
} else if (!(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{5,}$/.test(password))) {
    errors.push({ key: "password", message: "Password is to Low, Please Enter a Strong Password" })
}


}else{
  if (!email) {
    errors.push({key:"email", message:"Reqired field Email is Empty"})
  }else if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push({key:"email", message:"Invalid Email"})
  }
if (!password) {
    errors.push({key:"password", message:"Reqired field Password is Empty"})
}else if (!(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password))) {
    errors.push({key:"password", message:"Password is to weak"})
  }
 
}
   
return errors   
}

module.exports = Validation