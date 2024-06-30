import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

    const history = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/api/user/signup", {
                name: name,
                email: email,
                password: password,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    localStorage.setItem('token', res.data.authToken)
                    // console.log(res.data.authToken)
                    history("/dashboard")
                })
                .catch(e => {
                    alert("something went wronge!!");
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <form action="POST">

                <div className='container my-3' >
                    <h1>Create account</h1>
                    <div className=" my-3 " >
                        <div className="mb-3 ">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} id="Name" placeholder="enter user name" />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder="name@example.com" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="c-password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} id="c-password" placeholder="Enter Confirm Password" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <input className="btn btn-primary" type="submit" onClick={submit} value="Confirm" />
                            &nbsp;&nbsp;&nbsp;
                            <Link className="btn btn-primary" to="/Login" role="button">Login in existing account</Link>
                        </div>

                    </div>
                </div>
            </form>

        </>
    )
}
