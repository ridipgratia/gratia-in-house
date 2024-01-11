import React from 'react'
import { useAuth } from '../../context/auth/authContext';

const PrivateRoute = (props) => {
    const { role, children } = props;
    const { userData } = useAuth();
    return (
        <div>
            {userData.role === role ?
                <div>{children}</div>
                : <div style={{ widyj: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <h1 style={{ color: "#6a5acd", fontSize: "200px", fontFamily: "monospace" }}>404</h1>
                        <h2 style={{ color: "gray" }}>You are not Authorised For This Page.</h2>
                    </div>
                </div>}
        </div>
    )
}

export default PrivateRoute