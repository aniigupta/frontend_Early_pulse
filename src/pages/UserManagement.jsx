import React, { useState } from 'react';
import styled from 'styled-components';

const UserManagement = () => {
  // Static data for users with appointment info
  const initialUsers = [
    { id: 1, name: 'Kanchan', appointmentDateTime: '2024-12-20 10:00 AM', status: 'Scheduled' },
    { id: 2, name: 'Aniket', appointmentDateTime: '2024-12-21 11:00 AM', status: 'Pending' },
    { id: 3, name: 'Avanish', appointmentDateTime: '2024-12-22 01:00 PM', status: 'Completed' },
    { id: 4, name: 'Prakriti', appointmentDateTime: '2024-12-23 02:00 PM', status: 'Scheduled' },
    { id: 5, name: 'Lavisha', appointmentDateTime: '2024-12-24 03:00 PM', status: 'Pending' },
    { id: 6, name: 'Animesh', appointmentDateTime: '2024-12-25 04:00 PM', status: 'Completed' },
    { id: 7, name: 'Avishisht', appointmentDateTime: '2024-12-26 05:00 PM', status: 'Scheduled' },
    { id: 8, name: 'Nishthaa', appointmentDateTime: '2024-12-27 06:00 PM', status: 'Pending' },
    { id: 9, name: 'Himanshu', appointmentDateTime: '2024-12-28 07:00 PM', status: 'Completed' },
    { id: 10, name: 'Parth', appointmentDateTime: '2024-12-29 08:00 PM', status: 'Scheduled' },
  ];
  

  // State to manage users
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedAppointmentDateTime, setUpdatedAppointmentDateTime] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');

  // Function to handle user deletion
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  // Function to handle editing a user's appointment
  const handleEditUser = (user) => {
    setEditingUser(user);
    setUpdatedAppointmentDateTime(user.appointmentDateTime);
    setUpdatedStatus(user.status);
  };

  // Function to save the updated user appointment details
  const handleSaveEdit = () => {
    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? { ...user, appointmentDateTime: updatedAppointmentDateTime, status: updatedStatus }
        : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  return (
    <Container>
      <Heading>User Management</Heading>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Appointment Date & Time</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.appointmentDateTime}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <EditButton onClick={() => handleEditUser(user)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDeleteUser(user.id)}>Delete</DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {editingUser && (
        <EditModal>
          <h2>Edit Appointment</h2>
          <label>
            Appointment Date & Time:
            <input
              type="datetime-local"
              value={updatedAppointmentDateTime}
              onChange={(e) => setUpdatedAppointmentDateTime(e.target.value)}
            />
          </label>
          <label>
            Status:
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <div>
            <SaveButton onClick={handleSaveEdit}>Save</SaveButton>
            <CancelButton onClick={() => setEditingUser(null)}>Cancel</CancelButton>
          </div>
        </EditModal>
      )}
    </Container>
  );
};

// Styled-components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

const EditButton = styled.button`
  background-color: #ffa500;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const EditModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
`;

export default UserManagement;
