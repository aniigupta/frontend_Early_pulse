import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import styled from 'styled-components';

const UserRequests = ({ labId, onUserApproved }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [schedulerVisible, setSchedulerVisible] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://44.207.8.0:8080/api/appointments/lab/${user.labId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user.labId]);

  const handleApprove = (id) => {
    const request = requests.find((req) => req.id === id);
    setSelectedRequest(request);
    setSchedulerVisible(true);
  };

  const handleReject = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const handleSchedule = (appointmentTime) => {
    // Update the request with the new appointment time
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, appointmentDate: appointmentTime, status: 'Scheduled' }
        : req
    );
    setRequests(updatedRequests);
    setSchedulerVisible(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <p>Loading appointments...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon>!</ErrorIcon>
        <p>Error: {error}</p>
        <RetryButton onClick={() => window.location.reload()}>Retry</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Appointment Requests</Title>
        <Subtitle>Manage incoming lab appointment requests</Subtitle>
      </Header>

      {requests.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📅</EmptyIcon>
          <p>No pending appointments</p>
        </EmptyState>
      ) : (
        <CardGrid>
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <CardTitle>{request.userName}</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow>
                  <Label>📅 Appointment Date:</Label>
                  <Value>{request.appointmentDate || 'Pending'}</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Status:</Label>
                  <Value>{request.status}</Value>
                </InfoRow>
                <ButtonContainer>
                  <ApproveButton onClick={() => handleApprove(request.id)}>
                    ✓ Approve
                  </ApproveButton>
                  <RejectButton onClick={() => handleReject(request.id)}>
                    ✕ Reject
                  </RejectButton>
                </ButtonContainer>
              </CardContent>
            </Card>
          ))}
        </CardGrid>
      )}

      {schedulerVisible && (
        <SchedulerModal
          request={selectedRequest}
          onClose={() => setSchedulerVisible(false)}
          onSchedule={handleSchedule}
        />
      )}
    </Container>
  );
};

const SchedulerModal = ({ request, onClose, onSchedule }) => {
  const [appointmentTime, setAppointmentTime] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!appointmentTime) {
      setError('Please select a valid appointment time.');
      return;
    }
    onSchedule(appointmentTime);
  };

  return (
    <ModalOverlay>
      <Modal>
        <h2>Schedule Appointment</h2>
        <p>Set a time for {request.userName}'s appointment:</p>
        <Input
          type="datetime-local"
          value={appointmentTime}
          onChange={(e) => {
            setAppointmentTime(e.target.value);
            setError('');
          }}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <ModalActions>
          <SaveButton onClick={handleSave}>Save</SaveButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ModalActions>
      </Modal>
    </ModalOverlay>
  );
};

// Styled Components
const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const Value = styled.span`
  font-size: 15px;
  color: #2c3e50;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ApproveButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #34c759;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const RejectButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #ff3b30;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const ErrorIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ff3b30;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #34c759;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 32px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 16px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ErrorText = styled.p`
  color: #ff3b30;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #34c759;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ff3b30;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default UserRequests;
