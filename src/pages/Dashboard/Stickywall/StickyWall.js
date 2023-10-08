import React, { useState, useEffect } from 'react';
import { UesDoxContext } from '../../Context/DoxContext';
import Add from '../../../components/AddDoc/Add';
import { useAuthContext } from '../../Context/AuthContext';
import { firestore } from '../../../config/firebase';
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import {
  UserOutlined,
} from '@ant-design/icons';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function Home() {
  const { documents: users } = UesDoxContext(); // Assuming this provides the user data
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const courseCollection = collection(firestore, 'courses');
        const courseSnapshot = await getDocs(courseCollection);
        setCourseCount(courseSnapshot.size);
      } catch (error) {
        console.error('Error fetching course count:', error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const usersCollection = collection(firestore, 'students'); // Replace 'users' with your actual users collection name
        const usersSnapshot = await getDocs(usersCollection);
        setUserCount(usersSnapshot.size);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchCourseCount();
    fetchUserCount();
  }, []); // Fetch counts only once on component mount

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
           <Link to="/students">
            <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3 " style={{ minHeight: "10rem" ,backgroundColor:'teal',color:'white'}}>
              <a className="Plus nav-link"><UserOutlined style={{ fontSize: '4rem' }} />Students ({userCount})</a>
            </div>
           </Link>
          </div>
          <div className="col">
            <Link to="/attendence">
            <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ minHeight: "10rem",backgroundColor:'teal',color:'white' }}>
              <a className="Plus nav-link"><GiCheckMark size={40} />Attendance</a>
            </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/courses">
            <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ minHeight: "10rem",backgroundColor:'teal',color:'white' }}>
              <a className="Plus nav-link"><MdOutlineLibraryBooks size={40} />Courses ({courseCount})</a>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}