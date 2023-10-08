import React, { useEffect, useState } from 'react';
import { Input, Popconfirm, message, Modal, Form, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { firestore } from '../../../config/firebase';
import AddCourse from '../../../components/AddDoc/Add Course';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Today() {
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem('courses');
    return storedCourses ? JSON.parse(storedCourses) : [];
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [addModalVisible, setAddModalVisible] = useState(false);  // Define add modal visibility state

  const fetchCourses = async () => {
    const courseCollection = collection(firestore, 'courses');
    const courseSnapshot = await getDocs(courseCollection);
    const courseData = courseSnapshot.docs.map(doc => ({ ...doc.data(), courseId: doc.id }));
    setCourses(courseData);
    localStorage.setItem('courses', JSON.stringify(courseData));
  };

  const handleDelete = async (courseId) => {
    try {
      const courseDocRef = doc(firestore, 'courses', courseId);
      await deleteDoc(courseDocRef);

      setCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));

      message.success('Course deleted successfully.');
    } catch (error) {
      console.error('Error deleting course:', error);
      message.error('Failed to delete course.');
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const courseDocRef = doc(firestore, 'courses', selectedCourse.courseId);
      await updateDoc(courseDocRef, {
        name: selectedCourse.name,
        description: selectedCourse.description,
        courseCode: selectedCourse.courseCode,
        department: selectedCourse.department,
      });

      setCourses(prevCourses => {
        return prevCourses.map(course => {
          if (course.courseId === selectedCourse.courseId) {
            return { ...course, ...selectedCourse };
          }
          return course;
        });
      });

      message.success('Course updated successfully.');
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating course:', error);
      message.error('Failed to update course.');
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleAddCourse = (values) => {
    // Add the new course to Firestore and update the local state
    // Add the logic to create a new course in the Firestore database
    // ...

    // Update local state (for demonstration purposes, we'll just append the new course)
    const newCourse = { ...values, courseId: 'some-unique-id' };  // Replace 'some-unique-id' with an actual ID
    setCourses(prevCourses => [...prevCourses, newCourse]);
    message.success('Course added successfully.');

    // Close the add course modal
    setAddModalVisible(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <AddCourse
        visible={addModalVisible}
        onCreate={handleAddCourse}
        onCancel={() => setAddModalVisible(false)}
      />

      {/* ... (rest of the code) */}

      {/* Table to display course data */}
      <table className="table w-100">
        <thead>
          <tr>
            <th scope="col">Course ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Course Code</th>
            <th scope="col">Department</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.courseCode}</td>
              <td>{course.department}</td>
              <td>
                <span style={{ cursor: 'pointer' }} >
                  <EditOutlined style={{ marginRight: '8px', color: 'blue' }} onClick={() => handleEdit(course)} />
                </span>
                <Popconfirm
                  title="Are you sure you want to delete this course?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDelete(course.courseId)}
                >
                  <DeleteOutlined style={{ color: 'red' }} />
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Edit Course"
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={selectedCourse?.name}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={selectedCourse?.description}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Course Code">
            <Input
              value={selectedCourse?.courseCode}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, courseCode: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Department">
            <Input
              value={selectedCourse?.department}
              onChange={(e) => setSelectedCourse({ ...selectedCourse, department: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
