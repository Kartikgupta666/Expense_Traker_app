
import React, { useContext, useState } from 'react'
// import axios from 'axios'
import AccountContext from '../Context/account/AccountContext';
import { useNavigate } from 'react-router-dom';

const Depositmoney = () => {
    const history = useNavigate()
    const AccountTransaction = useContext(AccountContext)
    const { addMoney } = AccountTransaction
    const [account, setAccount] = useState({ note: "", money: "" })


    const submit = async () => {
        await addMoney(account.note, account.money)
        history("/dashboard")
    }
    const onchange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    return (
        <>
            <br /><br />
            <br /><br />
            <div className="container mt-5 px-5 ">
                <form action="POST">
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <input type="text" className="form-control" id="note" name="note" placeholder="ENTER A NOTE HERE" onChange={onchange} />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="money">Money</label>
                        <input type="number" className="form-control" id="money" name="money" onChange={onchange} />
                    </div>
                    <br/>
                    <button type="button" className="btn btn-primary " onClick={submit}>Send</button>
                </form>
            </div>
        </>
    )
}

export default Depositmoney
