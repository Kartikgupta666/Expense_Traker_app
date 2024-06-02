import React, { useContext, useState } from 'react'
import AccountContext from '../Context/account/AccountContext'
import { useNavigate } from 'react-router-dom'

export default function Fundtransfer() {
    const history = useNavigate()
    const AccountTransaction = useContext(AccountContext)
    const { withdrawMoney } = AccountTransaction
    const [account, setAccount] = useState({ note: "", money: "" })


    const submit = async () => {
        await withdrawMoney(account.note, account.money)
        history('/dashboard')
    }
    const onchange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    return (
        <>
            <br /><br />
            <br /><br />
            <div class="container mt-5 px-5">
                <form action="POST">
                    <div class="form-group">
                        <label for="note">Note</label>
                        <input type="text" class="form-control" id="note" name="note" placeholder="ENTER A NOTE HERE" onChange={onchange} />
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="money">Money</label>
                        <input type="number" class="form-control" id="money" name="money" onChange={onchange} />
                    </div>
                    <br />
                    <button type="button" class="btn btn-primary d-flex justify-content-center" onClick={submit}>Send</button>
                </form>
            </div>
        </>
    )
}
