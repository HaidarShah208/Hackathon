import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import {PlusCircleOutlined} from '@ant-design/icons'


const initialState = {
  courseId: Math.random().toString(32).substring(2),
  name: '',
  description: '',
  courseCode: '',
  department: ''
};

const Add = () => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setCourse(initialState);
    setOpen(false);
  };

  const handleOk = async () => {
    if (course.name.length < 3) {
      window.notify('Please enter a valid name!', 'info');
      return;
    }

    if (course.courseCode.length < 1) {
      window.notify('Please enter a valid course code!', 'info');
      return;
    }

    try {
      const courseData = { ...course };
      await setDoc(doc(firestore, 'courses', courseData.courseId), courseData);
      setOpen(false);
      window.notify('Course details saved successfully', 'success');
      setCourse(initialState);
    } catch (err) {
      window.notify('Failed to save course details', 'error');
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3 p-3" onClick={showModal}>
          <a className="Plus nav-link text-danger">Add New Course <span className='ms-2'><PlusCircleOutlined /></span></a>
        </div>
      </div>

      <Modal title="Course Details" visible={open} onOk={handleOk} onCancel={handleCancel}>
        <div className="row">
          <div className="col">
            <label htmlFor="courseId" className="fw-bold">
              Course ID
            </label>
            <br />
            <Input
              type="text"
              placeholder="Course ID"
              id="courseId"
              className="w-100"
              value={course.courseId}
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
              value={course.name}
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="description" className="fw-bold">
              Description
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter description"
              id="description"
              className="w-100"
              value={course.description}
              name="description"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="courseCode" className="fw-bold">
              Course Code
            </label>
            <br />
            <Input
              type="text"
              placeholder="Enter course code"
              id="courseCode"
              className="w-100"
              value={course.courseCode}
              name="courseCode"
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
              value={course.department}
              name="department"
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Add;
