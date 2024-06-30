import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from './Alert'
import Spinner from './spinner';

export default function Login() {

    const history = useNavigate();
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(null)
    const [loading, setLoading] = useState(false)



    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await axios.post("https://expense-traker-app.onrender.com/api/user/login", {
                email: email,
                password: password,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {


                    if (res.data.success === true) {
                        // redirect

                        localStorage.setItem('token', res.data.authToken)
                        setLoading(false)
                        history("/dashboard")
                    }
                    else {
                        setLoading(false)
                        showAlert(res.data.error, "danger");
                    }


                }).catch(e => {
                    setLoading(false)
                    console.log(e)

                })
        }
        catch (e) {
            setLoading(false)

            console.log(e);
        }
    }

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            types: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    return (
        <>

            <Alert alert={alert} />

            <Spinner loading={loading} />
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
