import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {

    const [inpval, setINP]=useState({
        name: "",
        nid: ""
    })

    const setdata=(e)=>{
        console.log(e.target.value);

        const {name, value}=e.target;
        setINP((preval)=>{
            return{
                ...preval,
                [name]: value
            }
        })

    }


    const addinpdata = async (e) => {
        //e.preventDefault();

        const { name, nid } = inpval;


        if (name == "") {
            alert("name is required")
        } else if (nid == "") {
            alert("nid is required")
        } else {

            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, nid
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } /*else {
                history.push("/")
                setUdata(data)
                console.log("data added");

            }*/
        }

    }

    return (
        <div className='container'>
            <NavLink to="/">home</NavLink>

            <form className='mt-4'>
                <div className='row'>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text" onChange={setdata} value={inpval.name} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">National ID</label>
                        <input type="text" onChange={setdata} value={inpval.nid} name="nid" class="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    <NavLink to="/"> <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button></NavLink>
                </div>
            </form>
        </div>
    )
}

export default Register