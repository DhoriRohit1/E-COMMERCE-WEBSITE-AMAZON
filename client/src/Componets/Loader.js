import "../Componets/Loader.css"
export default function Loader({ loading }) {
    if (loading) {
        return (

            <>
                <div className="main_loader">

                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="text2 text-light">Loaging...</div>

                </div>
            </>

        )
    }
    return <></>

}