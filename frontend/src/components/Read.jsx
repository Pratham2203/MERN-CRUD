import React from 'react'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
function Read() {
    const [data,setData]=useState();
    const [error,setError]=useState("");

    async function getData(){
        const response=await fetch("https://mern-crud-omega.vercel.app");
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        else{
            setData(result);
            setError("");
        }
    }
    const handleDelete=async (id)=>{
        const response=await fetch(`https://mern-crud-omega.vercel.app/${id}`,{method:"DELETE"})
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        else{
            setError("Deleted Successfully");
            console.log(result);
            setTimeout(()=>{
                setError("");
                getData();
            },1000)
        }
    };

    useEffect(()=>{
        getData();
    },[])
    console.log(data);
    return(
        <div className='container my-2 text-center'>
            {error && <div className="alert alert-danger">{error} </div>}
            <h1 className='text-center'>All data</h1>
            <div className='row'>
                {data?.map((ele)=>(
                    <div key={ele._id} className='col-3'>
                    <div className="card my-4">
                        <div className="card-body">
                            <h5 className="card-title">{ele.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                            <p className="card-text">{ele.age}</p>
                            <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
                            <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                        </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Read
