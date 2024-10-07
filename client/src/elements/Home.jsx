import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {

    if (deleted) {
      setDeleted(false);
    }
    axios.get('/students')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err));
  }, [deleted]);

  const handleDelete = (id) => {
    axios.delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='container-fluid'>
      <h3>Students</h3>
      <div className='container-fluid bg-primary vh-100 vw-90'>
        <div className='d-flex justify-content-end'>
          <Link to='/create' className='btn btn-success '>Create</Link>
        </div>
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {
              data.map((student) => {
                return (
                  <tr>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>
                      <Link to={`/read/${student.id}`} className='btn btn-success'>Read</Link>
                      <Link to={`/edit/${student.id}`} className='btn btn-success'>Edit</Link>
                      <button className='btn btn-danger' onClick={() => handleDelete(student.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Home