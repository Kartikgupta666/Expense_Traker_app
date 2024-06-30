import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountContext from '../Context/account/AccountContext';
import './Css/Navbar.css'

export default function Navbar() {
    let location = useLocation();
    let history = useNavigate()

    const { user, getuser } = useContext(AccountContext)

    useEffect(() => {
        getuser()
        // eslint-disable-next-line
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        history('/')
    }
    const show = () => {
        const list = document.getElementById('list');
        list.classList.toggle("show")
    }

    

    //by using uselocation hook to show which tab is open and the tab name on the nav bar is highlighted
    return (
        <>
            
            <nav>
                <div className="brand">
                    <h2>Expense Traker</h2>
                    <button onClick={show}>
                    {localStorage.getItem('token') ? user.name : "guest"}
                    </button>
                </div>
                <ul id="list">
                    <li> <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link> </li>
                    <li> <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} to="/dashboard">DashBoard</Link> </li>
                    <li> {!localStorage.getItem('token') ? (
                        <Link className={`nav-link ${location.pathname === "/Login" ? "active" : ""}`} to="/Login">Login</Link>) :
                        (<Link className={`nav-link ${location.pathname === "/Logout" ? "active" : ""}`} onClick={logout} to="/Login">Logout</Link>)}</li>

                    <li>{
                        localStorage.getItem('token') ?
                            (<Link className="nav-link text-capitalize active" to="#" tabIndex="-1" aria-disabled="true"> Welcome! {user.name} </Link>) :
                            (<Link className="nav-link text-capitalize active" to="#" tabIndex="-1" aria-disabled="true">Guest</Link>)} </li>
                </ul>
            </nav>

        </>
    )
}
