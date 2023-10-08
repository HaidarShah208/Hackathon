import React, { useState } from 'react';
import { UesDoxContext } from '../../Context/DoxContext';
import Add from '../../../components/AddDoc/Add';
import { Input, Popconfirm, message, Modal, Form } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { firestore } from '../../../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Upcoming() {
  const { documents } = UesDoxContext();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    // Handle the student update logic here
    try {
      const studentRef = doc(firestore, 'students', selectedStudent.uniqueId);
      await updateDoc(studentRef, {
        name: selectedStudent.name,
        rollNo: selectedStudent.rollNo,
        department: selectedStudent.department,
        address: selectedStudent.address,
        city: selectedStudent.city,
        phoneNumber: selectedStudent.phoneNumber,
        idCard: selectedStudent.idCard,
      });

      message.success('Student information updated successfully.');
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating student information:', error);
      message.error('Failed to update student information.');
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleDelete = async (student) => {
    try {
      const studentRef = doc(firestore, 'students', student.uniqueId);
      await deleteDoc(studentRef);
      message.success('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('Failed to delete student');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Add />
          </div>
          <div className="col">
            <Input addonBefore={<SearchOutlined />} name="search" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className="container w-100">
        <div className="row w-100">
          <div className="col">
            <div className="table-responsive w-100">
              <table className="table w-100">
                <thead>
                  <tr>
                    <th scope="col">Unique Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll</th>
                    <th scope="col">Department</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">Phone</th>
                    <th scope="col">ID card</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((student) => (
                    <tr key={student.uniqueId}>
                      <td>{student.uniqueId}</td>
                      <td>{student.name}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.department}</td>
                      <td>{student.address}</td>
                      <td>{student.city}</td>
                      <td>{student.phoneNumber}</td>
                      <td>{student.idCard}</td>
                      <td>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleEdit(student)}>
                          <EditOutlined style={{ marginRight: '8px', color: 'blue' }} />
                        </span>
                        <Popconfirm
                          title="Are you sure you want to delete this student?"
                          onConfirm={() => handleDelete(student)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined style={{ color: 'red' }} />
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      <Modal
        title="Edit Student"
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={selectedStudent?.name}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Roll No">
            <Input
              value={selectedStudent?.rollNo}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, rollNo: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Department">
            <Input
              value={selectedStudent?.department}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, department: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={selectedStudent?.address}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              value={selectedStudent?.city}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, city: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input
              value={selectedStudent?.phoneNumber}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, phoneNumber: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="ID Card">
            <Input
              value={selectedStudent?.idCard}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, idCard: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
