import React, { useState } from 'react'
import AddAttendence from '../../../components/AddDoc/Add Attendence';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { Input, Popconfirm, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
export default function Calender() {

  const handleEdit = (student) => {
    // Handle edit action
    // You can open a modal or navigate to an edit page
    console.log('Edit student:', student);
  };
  const handleDelete = async (student) => {
    try {
      // Reference the student document in Firestore
      const studentRef = doc(firestore, 'students', student.uniqueId);
  
      // Delete the student document
      await deleteDoc(studentRef);
  
      // Update the state or show a success message
      // Update your state or show a success message here
      message.success('Student deleted successfully');
    } catch (error) {
      // Handle any errors that occur during deletion
      console.error('Error deleting student:', error);
      message.error('Failed to delete student');
    }
  };
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <AddAttendence />
          </div>
          <div className="col">
            <Input addonBefore={<SearchOutlined />} name="search" placeholder="Search" />
          </div>
        </div>
      </div>
     
    </>
  );
}
