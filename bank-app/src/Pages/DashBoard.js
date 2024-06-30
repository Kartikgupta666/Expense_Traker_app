import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AccountContext from '../Context/account/AccountContext';


export default function DashBoard() {
    const AccountTransaction = useContext(AccountContext)
    // const Userdetailcontext = useContext(UserDetailcontext)
    // this is used for rendering the transaction in the dashbaord of bank app
    // accountbalance | | accountnumber

    const { user, account, getAllTransaction, getuser } = AccountTransaction


    const history = useNavigate()

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getuser()
            getAllTransaction()


        }
        else {
            history('/Login')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            
            <div className="container my-4 mt-5">
                <div className="row">
                    {/* Account Summary */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Account Summary</div>
                            <div className="card-body">
                                <h5 className="card-title">Account Balance</h5>
                                <p className="card-text"> RS.{user.accountbalance}/- </p>
                                {/* <h5 className="card-title">Account Number</h5>
                                <p className="card-text"> {user.accountnumber} </p> */}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                        <Link className='btn btn-warning' to='/FundTransfer' >FUND TRANSFER</Link>
                        &nbsp;
                        &nbsp;
                        <Link className='btn btn-success' to='/deposit' >Deposit Money</Link>
                        </div>

                    </div>

                    {/* Recent Transactions */}
                    <div className="col-lg-8 col-md-6">
                        <div className="card mb-3">
                            <div className="card-header text-center fw-bold fs-4">Recent Transactions</div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                            <th>Note</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            account.map((account) => {
                                                return (
                                                    <tr>
                                                        <td> {account.date} </td>
                                                        <td> {account.name} </td>
                                                        <td>{account.status}</td>
                                                        <td>{account.note}</td>
                                                        <td>{account.money}</td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </>
    );
};