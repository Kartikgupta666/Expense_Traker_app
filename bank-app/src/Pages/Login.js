import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

    const history = useNavigate();
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')


    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/user/login", {
                email: email,
                password: password,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {

                    // console.log(res.data.authToken)
                    if (res.data.success === true) {
                        // redirect
                        localStorage.setItem('token', res.data.authToken)
                        history("/dashboard")
                    }
                    else {
                        // alert("login with correct credentials")
                        alert(res.data.error)
                    }


                }).catch(e => {
                    console.log(e)
                    // alert(e)
                })
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <>


            <form action="POST">

                <div className='container my-3'>
                    <h1>Login</h1>
                    <div className=" my-3 " >

                        <div className="mb-3 ">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" onChange={(e) => { setemail(e.target.value) }} id="email" placeholder="enter an email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} id="password" placeholder="Enter Password" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <input className="btn btn-primary" type="submit" onClick={submit} value="Log in" />
                            &nbsp;&nbsp;&nbsp;
                            <Link className="btn btn-primary" to="/Register" role="button">Sign up</Link>
                        </div>

                    </div>
                </div>
            </form>

        </>

    )
}
