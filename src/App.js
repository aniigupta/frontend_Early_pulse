import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserRequests from './pages/UserRequests';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Labs from './pages/Labs';
import styled from 'styled-components';
import { UserProvider } from './pages/UserContext';
import axios from 'axios';

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px; // Same as sidebar width
  background: #f8fafc;
  min-height: 100vh;
`;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </DashboardLayout>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);

  const handleUserApproved = (newUser ) => {
    // Logic to handle the approved user
    setUsers((prevUsers) => [...prevUsers, newUser ]);
    console.log('User  approved:', newUser );
    
    // Optionally, you can also make an API call to update the user's status in the database
    axios.post('/api/approveUser ', newUser )
      .then(response => console.log('User  approved in DB:', response))
      .catch(error => console.error('Error approving user:', error));
  };

  const handleReject = async (id) => {
    try {
      // Optionally, make an API call to reject the user request
      await fetch(`http://localhost:8080/api/rejectRequest/${id}`, {
        method: 'DELETE',
      });

      // Update the state to remove the rejected request
      console.log('User  request rejected:', id);
    } catch (error) {
      console.error('Error rejecting user request:', error);
    }
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/user-requests" element={
            <ProtectedRoute>
              <UserRequests onUserApproved={handleUserApproved} onUser Reject={handleReject} />
            </ProtectedRoute>
          } />
          <Route path="/user-management" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/labs" element={
            <ProtectedRoute>
              <Labs />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;