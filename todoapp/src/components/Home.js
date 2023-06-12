import React, { useState, useEffect, useContext } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    //console.log("getusersssss"+" "+typeof(getuserdata)+" "+getuserdata.length);
    let isCached=false;

    const getdata = async () => {
        
        const res = await fetch("/getusers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        const data = await res.json();
        console.log(data);
        console.log("end herrrr ");
        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log(data);
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            //setDLTdata(deletedata)
            getdata();
        }

    }


    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2 mb-2'>
                    <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                </div>

                <table class="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Id</th>
                            <th scope="col">Username</th>
                            <th scope="col">National ID</th>
                            <th scope="col">IsCached to Redis</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getuserdata.map((element, id) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.name}</td>
                                            <td>{element.nid}</td>
                                            <td>{isCached}</td>
                                            <td className="d-flex justify-content-between bt">
                                                <button className="btn btn-danger" onClick={() => deleteuser(element.id)}><DeleteOutlineIcon /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Home