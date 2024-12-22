import React from 'react'
import { useEffect,useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
function Update() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState(0);
    const [error,setError]=useState("");
    const {id}=useParams();
    const navigate=useNavigate();
    async function getSingleUser(){
        const response=await fetch(`http://localhost:5000/${id}`);
        const result=await response.json();
        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        else{
            setError("");
            console.log(result);
            setName(result.name);
            setEmail(result.email);
            setAge(result.age);
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age };
        console.log(updatedUser);
        const response = await fetch(`http://localhost:5000/edit/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
        const result = await response.json();
        if (response.ok) {
          console.log("updated result..", result);
          setError("");
          navigate("/all");
        }
        if (!response.ok) {
          console.log(response.error);
          setError(response.error);
        }
      };
    
    useEffect(()=>{
        getSingleUser();
    },[]);
    return (
        <div className='container my-2'>
    {error && <div className="alert alert-danger">{error} </div>}
    <h2 className='text-center'>Edit the data</h2>
    <form className="mb-3 text-center" onSubmit={handleUpdate} >
    <div className="mb-3">
        <label  className="form-label">Name</label>
        <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
    </div>
    <div className="mb-3">
        <label  className="form-label">Email address</label>
        <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
    </div>
    <div className="mb-3 ">
        <label  className="form-label">Age</label>
        <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)}/>
    </div>
        <button type="submit" className="btn btn-primary text-center">Submit</button>
    </form>
        </div>
    )
}

export default Update
