import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const DashboardContainer = styled.div`
  display: flex;
  min-height 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px; // Width of sidebar
  background: #f8fafc;
  min-height: 100vh;
`;

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Welcome to the ADMIN Dashboard!');
  }, []);

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <h1>{message}</h1>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
