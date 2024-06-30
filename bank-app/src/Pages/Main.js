import React from 'react'
import { Link } from 'react-router-dom'
export default function Main() {
    return (
        <>
            <br /><br />
           

            <div className="container">
                <div className="row mt-1">
                    <div className="col-lg-6">
                        <h1>Welcome to Expense Traker</h1>
                        <p className="lead">We provide perfect analysis of your Expense</p>
                        <div className="d-flex justify-content-center">
                        <Link className="btn btn-primary" to="/Login" >Get Started</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                        <img src="https://media.istockphoto.com/photos/bank-picture-id528585263?k=6&m=528585263&s=170667a&w=0&h=TyDxqtSeEnftoQNMIcGHKcU7t4CuGZFUynjbghsf4I8=" alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
            <br /><br />



        </>
    )
}
