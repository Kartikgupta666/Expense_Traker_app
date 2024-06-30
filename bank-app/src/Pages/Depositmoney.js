
import React, { useContext, useState } from 'react'
// import axios from 'axios'
import AccountContext from '../Context/account/AccountContext';
import { useNavigate } from 'react-router-dom';
import Spinner from './spinner'

const Depositmoney = () => {
    const history = useNavigate()
    const AccountTransaction = useContext(AccountContext)
    const { addMoney } = AccountTransaction
    const [account, setAccount] = useState({ note: "", money: "" })
    const [loading, setLoading] = useState(false)


    const submit = async () => {
        setLoading(true)
        await addMoney(account.note, account.money)
        setLoading(false)
        history("/dashboard")
    }
    const onchange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    return (
        <>
            <br /><br />
            <div className="container mt-5 px-5 ">
                <Spinner loading={loading} />
                <form action="POST">
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <input type="text" className="form-control" id="note" name="note" placeholder="ENTER A NOTE HERE" onChange={onchange} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="money">Money</label>
                        <input type="number" className="form-control" id="money" name="money" onChange={onchange} />
                    </div>
                    <br />
                    <button type="button" className="btn btn-primary " onClick={submit}>Send</button>
                </form>
            </div>
        </>
    )
}

export default Depositmoney
