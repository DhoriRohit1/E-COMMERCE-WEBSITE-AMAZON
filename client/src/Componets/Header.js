import { Link, useNavigate } from "react-router-dom"


function Header({ cartItems, token, setUserInfo, setToken }) {

  const navigte = useNavigate()
  function click() {
    navigte("/")

  }
  const navigate = useNavigate()

  const ClickToLogin = () => {
    return navigate("/user/Login")
  }

  const Logouthandler = () => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    setUserInfo({})
    setToken("")
  }

  return (
    <header className='h-50 bg-dark text-light px-3 py-2 d-flex align-center justify-content-between sticky-top'>
      <div className='logo'>
        <h2><a href="#!" style={{ textDecoration: "none" }} onClick={click} className='fw-bold cursor-pointer text-light'>{"amazon"}</a></h2>
      </div>
      <div className='d-flex gap-2 align-item-center text-light'>
        <span path="/" style={{ marginTop: "10px", fontSize: "25px", position: "relative", right: "20px" }}>
          <span style={{ height: "30px", width: "7px", paddingRight: "20px", position: "relative", top: "-20px", left: "45px", borderRadius: "50px" }} className="badge bg-warning text-dark">{cartItems.length}</span>
          <Link to={"/cart"} className="text-light" style={{ textDecoration: "none" }}>
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </span>
        <button onClick={token ? Logouthandler : ClickToLogin}
          className='btn btn-warning fw-bold bg-gradient'>
          {token ? "SingOut" : "SignIn"}
        </button>
      </div>
    </header>
  )
}

export default Header