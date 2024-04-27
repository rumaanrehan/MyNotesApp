import React, { useEffect, useState } from 'react'

const GetUser = () => {
    const [users, setusers] = useState(null)
    
    useEffect( () => {
        getuser()
    }, [])
    
    const getuser = async ()=>{
        const response = await fetch("http://localhost:5000/api/auth/getuser",{
            method: "POST",
            headers: {
                'auth-token' : localStorage.getItem('token')
            },
        });
        console.log(response)
        setusers(response)
    }
    
    return (
    <div>
        User details: 
        {/* <p>{users}</p> */}
    </div>
  )
}

export default GetUser