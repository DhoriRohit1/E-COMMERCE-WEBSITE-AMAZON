export default function Message ({ children }){
    console.log(children);
    if (children) {
        return (
            <div style={{ color:"#FC0202", background:"#FFFFFF", width:"99%", margin:"0.5rem auto"}} className="d-block p-2 rounded-3">
            {children}
            </div>
            
            
        )
    }
    return <></>
}