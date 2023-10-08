import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider, Space } from 'antd';
import {MdOutlineLibraryBooks} from 'react-icons/md';
import {GiCheckMark} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Routes from './Routes';
import { useAuthContext } from '../../pages/Context/AuthContext'
import { UesDoxContext } from '../Context/DoxContext';
const { Header, Sider, Content } = Layout;
const initalState = { search:""}

export default function Sidbar() {
  const [state, setState] = useState(initalState)
  const [isSpiner, setisSpiner] = useState(false)
  const [collapsed, setCollapsed] = useState(true);
  const { user, dispatch } = useAuthContext()
  const { listDocuments, documents ,setDocuments} = UesDoxContext()


  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
// ------------------------------- handle search 
const filterBySearch = () => {
  // Access input value
  const {search} = state
  const query = search
  console.log(query);
  // Create copy of item list
 ;
  // Include all elements which includes the search query
  let updatedList = documents.filter((doc) => {
    return doc.title.toLowerCase().includes(query.toLowerCase())|| doc.description.toLowerCase().includes(query.toLowerCase());
  });
  // Trigger render with updated values
  setDocuments(updatedList);
};


  return (




    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>

        <p className='ps-1 mt-4  fs-6 rounded ps-2 pe-2 text-white py-3'style={{background:'gray'}} >Admin Management </p>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}


          items={[

            {
              key: '/upcoming',
              icon: <UserOutlined />,
              label: <Link to="/students" className='nav-link'>Student</Link>,
            },
            {
              key: '/today',
              icon: <MdOutlineLibraryBooks />,
              label: <Link to="/courses" className='nav-link'>Course's</Link>,
            },
            {
              key: '/calendar',
              icon: <GiCheckMark />,
              label: <Link to="/attendence" className='nav-link'>Attendence</Link>,
            },
          ]}
        />

        <Divider />
      </Sider>
      <Layout>
        <Header style={{ background: '#9999', padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          />
          <span className='fs-3 fw-bold ms-2'>Dashboard</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
          }}
        >

          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

