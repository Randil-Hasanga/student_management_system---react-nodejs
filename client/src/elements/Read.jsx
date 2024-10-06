import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Read = () => {

  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className='container-fluid bg-primary vh-100 vw-90'>
      <h1>User {id}</h1>
      {
        data ? (
          <ul className='list-group'>
            <li className='list-group-item'>
              <b>ID: </b>
              {data.id}
            </li>
            <li className='list-group-item'>
              <b>Name: </b>
              {data.name}
            </li>
            <li className='list-group-item'>
              <b>Email: </b>
              {data.email}
            </li>
            <li className='list-group-item'>
              <b>Age: </b>
              {data.age}
            </li>
            <li className='list-group-item'>
              <b>Gender: </b>
              {data.gender}
            </li>
          </ul>
        ) : (
          <p>Loading...</p>
          )
      }
    </div>
  )
}

export default Read