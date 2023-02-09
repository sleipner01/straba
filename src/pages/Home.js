import React, {useEffect, Fragment } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';


const Home = () => {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
            }
        });

    }, [])

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <section>
            <Fragment>
                <nav>
                    <p>
                        Welcome Home
                    </p>

                    <div>
                        <NavLink to="/login" onClick={handleLogout}>
                            Logout
                        </NavLink>
                    </div>
                </nav>
            </Fragment>
        </section>
    )
}

export default Home