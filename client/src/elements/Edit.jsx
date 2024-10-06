import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';



const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});


  useEffect(() => {
    axios.get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);

      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/edit_user/${id}`, data)
      .then((res) => {
        console.log("updated successfully");
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className='container vh-100 vw-100 bg-primary'>
      <div className='row'>
        <h3>Add Student</h3>
        <div className='d-flex justify-content-end'>
          <Link to='/' className='btn btn-success'>Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group my-3'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </div>
          <div className='form-group my-3'>
            <label htmlFor="name">Email</label>
            <input type="text" name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <div className='form-group my-3'>
            <label htmlFor="name">Gender</label>
            <input type="text" name='gender' value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} />
          </div>
          <div className='form-group my-3'>
            <label htmlFor="name">Age</label>
            <input type="text" name='age' value={data.age} onChange={((e) => setData({ ...data, age: e.target.value }))} />
          </div>
          <div className='form-group my-3'>
            <button type='submit' className='btn btn-primary'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit
