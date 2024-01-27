import { useState } from "react"

import { useNavigate } from "react-router-dom"
import apiHelper from "../Commen/ApiHelper"
import Validator from "../Componets/Validation"


export default function Login({ setUserInfo, setToken }) {

  const [LoginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })
  const [ValidationErrors, setValidationErrorrs] = useState([])
  const [isSubmited, setisSubmited] = useState(false)
  const navigate = useNavigate()


  const LoginHandler = async () => {
    try {
      setisSubmited(true)
      const ValidationResult = Validator(LoginDetails, "login")

      if (ValidationResult.length > 0) {
        setValidationErrorrs(ValidationResult)
        return
      }



      const result = await apiHelper.userLogin(LoginDetails)
      if (result && result.data && result.data.userinfo && result.data.token) {

        localStorage.setItem("userInfo", JSON.stringify(result.data.userinfo))
        localStorage.setItem("token", result.data.token)
        setUserInfo(result.data.userinfo)
        setToken(result.data.token)
        navigate("/")
      }
    } catch (error) {
    
        if (error && error.response && error.response.stats === 400) {
          setValidationErrorrs(error.response.data.errors)
        }
    }
  }



  return (


    <div className="content">
      <div className="flex-div">
        <div className="name-content">
          <img className="image1" src="/images/amazon.png" alt="img"></img>
          <p className="shine">Amazon sells many products under its own brand names.</p>
        </div>
        <form>
          <div className="input1">
            <input onChange={(e) => {
              setLoginDetails({ ...LoginDetails, email: e.target.value })
              if (isSubmited) {
                const ValidationResult =Validator ({ ...LoginDetails, email: e.target.value }, "login")
                setValidationErrorrs(ValidationResult)
              }


            }} type="text" placeholder="Email or Phone Number" required />
            {
              ValidationErrors.find((x) => x.key === "email") ? (
                <span className="text-danger">
                  {
                    ValidationErrors.find((x) => x.key === "email").message
                  }
                </span>

              ) : ""
            }
          </div>
          <div className="input2">
            <input onChange={(e) => {
              setLoginDetails({ ...LoginDetails, password: e.target.value })
              if (isSubmited) {
                const ValidationResult = Validator  ({ ...LoginDetails, password:e.target.value }, "login")
                setValidationErrorrs(ValidationResult)
              }
            }} type="password" placeholder="Password" required />
            {
              ValidationErrors.find((x) => x.key === "password") ? (
                <span className="text-danger">
                  {
                    ValidationErrors.find((x) => x.key === "password").message
                  }
                </span>
              ) : ""
            }
          </div>
          <button onClick={LoginHandler} className="login" type="button">Sign in</button>
          <a href="##">Forgot Password ?</a>
          <hr />
          <button onClick={() => navigate("/Registerform")} className="create-account">Create New Account</button>
        </form>
      </div>
    </div>
  )
}

