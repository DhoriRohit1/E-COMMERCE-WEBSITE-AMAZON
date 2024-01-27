import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import Message from "../Componets/Messagebox"
// import Loader from "../Componets/Loader"
import Validator from "../Componets/Validation"
import apiHelper from "../Commen/ApiHelper"



export default function Register({setUserInfo, setToken}) {

    const navigate = useNavigate()

    const [registerDetails, setregisterDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    // const [loading,setisLoading] = useState([])
   const [RegisterErrors, setRegisterErrors] = useState([]);
   const [isSubmited, setisSubmited] = useState(false);
   const [setError] = useState("")
   const ChangeHandler = (e) => {
    const tmp = { ...registerDetails }
    tmp[e.target.id] = e.target.value
    setregisterDetails({ ...tmp })
    if (isSubmited) {
        const validationResult = Validator(tmp, "register")
        setRegisterErrors(validationResult)
    }
   }

    const RegisterHandler = async () => {
        try {
            setisSubmited(true)
            const validationResult = Validator(registerDetails, "register")
            if (validationResult.length > 0) {
                return setRegisterErrors(validationResult)
            }
            // setisLoading(true)
            const result = await apiHelper.userRegister(registerDetails)
            if (result.data && result.data.token && result.data.userinfo) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("userInfo", JSON.stringify(result.data.userinfo))
                setUserInfo(result.data.userinfo)
                setToken(result.data.token)
                navigate("/")
            }
            
            // if (!location.search) {
            //     navigate("/")
            //     return
            // }else {
            //     const path = location.search.split("?redirect=")[1]
            //     navigate(`/${path}?redirect=paymentMethod`)
            // }
            // setisLoading(false)

            
        } catch (error) {
            // setisLoading(false)
            if (error.response && error.response.status === 400 && error.response.data) {
                if (error.response.data.error) {
                    setRegisterErrors(error.response.data.errors)
                    return
                }else {
                    setError(error.response.data.message)
                    return
                }
            }else{
                setError(error.message)
            }
        }
    }





    return (

        // Error ? <Message> {Error}</Message> : <>
        // <Loader loading={loading} />
        <div className="content">
            <div className="flex-div">
                <div className="name-content">
                    <img className="image1" src="/images/amazon.png" alt="img"></img>
                    <p className="shine">Amazon sells many products under its own brand names.</p>
                </div>
                <form className="form1">
                  <div className="input1 justify-content-center flex-column align-items-center">
                    <input type="text" id="firstName" onChange={ChangeHandler} placeholder="FirstName" required />
                    {
                        RegisterErrors.find((x) => x.key === "firstName") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "firstName").message}</span> : ""
                    }
                  </div> 
                  <div className="input2 justify-content-center flex-column align-items-center"> 
                    <input type="text" id="lastName" onChange={ChangeHandler} placeholder="LastName" required />
                    {
                        RegisterErrors.find((x) => x.key === "lastName") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "lastName").message}</span> : "" 
                    }
                    </div>
                    <div className="input3 justify-content-center flex-column align-items-center"> 
                    <input type="text" id="email" onChange={ChangeHandler} placeholder="Enter Your Email" required />
                    {
                        RegisterErrors.find((x) => x.key === "email") ? <span className="text-danger">{RegisterErrors.find((x) => x.key === "email").message}</span> : ""  
                    }
                    </div>
                    <div className="input4 justify-content-center flex-column align-items-center"> 
                    <input type="password" id="password" onChange={ChangeHandler} placeholder="Password" required />
                    <br />
                    {
                        
                        RegisterErrors.find((x) => x.key === "password") ?  <span className="text-danger">{RegisterErrors.find((x) => x.key === "password").message}</span> : ""
                    }
                    </div>
                    <button onClick={RegisterHandler} className="create-account" type="button">Create New Account</button>
                    <a href="##">Allready have an Account</a>
                    <hr />
                    <button onClick={() => navigate("/user/login")} className="login">Sign up</button>
                </form>
            </div>

        </div>
        // </>
    )
}
