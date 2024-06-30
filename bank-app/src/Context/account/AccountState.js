import { useState } from "react";
import AccountContext from "./AccountContext";

import axios from 'axios'
const AccountState = (props) => {

  const Host = "https://expense-traker-app.onrender.com"
  const AccountTransaction = []
  const [account, setAccount] = useState(AccountTransaction)
  const [user, setuser] = useState("")

  // get user details


  const getuser = async () => {
    try {
      const response = await axios.post(`${Host}/api/user/getuser`, {}, {
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem('token')
        }
      });
      const json = await response.data;
      // console.log(json);
      setuser(json);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  // get all transaction

  const getAllTransaction = async () => {

    const response = await fetch(`${Host}/api/account/accountdetails`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')

      },

    });
    const json = await response.json()
    // console.log(json)
    setAccount(json)

  }



  // add money

  const addMoney = async (note, money) => {
    await fetch(`${Host}/api/account/depositmoney`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')

      },
      body: JSON.stringify({ note, money }),
    });
    const accounts = {
      "note": note,
      "status": "deposit",
      "money": money,

    }

    setAccount(account.concat(accounts));
  }



  // withdraw money

  const withdrawMoney = async (note, money) => {
    await fetch(`${Host}/api/account/withdrawl`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')

      },
      body: JSON.stringify({ note, money }),
    });
    const accounts = {
      "note": note,
      "status": "withdraw",
      "money": money,
    }

    setAccount(account.concat(accounts));
  }



  return (
    <AccountContext.Provider value={{ user, account, addMoney, withdrawMoney, getAllTransaction, getuser }}>
      {
        props.children
      }
    </AccountContext.Provider>
  )
}

export default AccountState;