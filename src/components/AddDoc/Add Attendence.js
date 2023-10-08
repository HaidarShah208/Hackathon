// Attendance.js
import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { PlusCircleOutlined } from '@ant-design/icons';

const initialState = {
  uniqueId: Math.random().toString(32).substring(2),
  name: '',
  rollNo: '',
  department: '',
  city: '',
  phoneNumber: '',
  idCard: '',
  course: '', // Add course property
  isPresent: true, // Add attendance status property (default to present)
};

const Attendance = () => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setStudent(initialState);
    setOpen(false);
  };

  const handleOk = async () => {
    if (student.name.length < 3) {
      window.notify('Please enter a valid name!', 'info');
      return;
    }

    if (student.rollNo.length < 1) {
      window.notify('Please enter a valid roll number!', 'info');
      return;
    }

    try {
      const studentData = { ...student };
      await setDoc(doc(firestore, 'students', studentData.uniqueId), studentData);
      setOpen(false);
      window.notify('Student details saved successfully', 'success');
      setStudent(initialState);
    } catch (err) {
      window.notify('Failed to save student details', 'error');
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 col-lg-6">
        <div className="box1 my-3 bold mx-sm-0 mx-md-0 mx-lg-3 p-3" onClick={showModal}>
          <a className="Plus nav-link ">
            Mark Your Attendance <span className="ms-2"><PlusCircleOutlined /></span>
          </a>
        </div>
      </div>

      <Modal title="Mark Attendance" visible={open} onOk={handleOk} onCancel={handleCancel}>
        <div className="row">
          <div className="col">
            <label htmlFor="uniqueId" className="fw-bold">
              Unique ID
            </label>
            <br />
            <Input
              type="text"
              placeholder="Unique ID"
              id="uniqueId"
              className="w-100"
              value={student.uniqueId}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="name" className="fw-bold">
              Name
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter name"
              id="name"
              className="w-100"
              value={student.name}
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="rollNo" className="fw-bold">
              Roll Number
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter roll number"
              id="rollNo"
              className="w-100"
              value={student.rollNo}
              name="rollNo"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="department" className="fw-bold">
              Department
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter department"
              id="department"
              className="w-100"
              value={student.department}
              name="department"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="city" className="fw-bold">
              City
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter city"
              id="city"
              className="w-100"
              value={student.city}
              name="city"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="phoneNumber" className="fw-bold">
              Phone Number
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter phone number"
              id="phoneNumber"
              className="w-100"
              value={student.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="idCard" className="fw-bold">
              ID Card
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter ID card details"
              id="idCard"
              className="w-100"
              value={student.idCard}
              name="idCard"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="course" className="fw-bold">
              Course
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter course"
              id="course"
              className="w-100"
              value={student.course}
              name="course"
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Attendance;
