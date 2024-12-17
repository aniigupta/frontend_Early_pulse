import React from 'react';
import styled from 'styled-components';
import { useUser } from './UserContext';

const Container = styled.div`
  padding: 2rem;
  background: #f8fafc;
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #4c669f 0%, #3b5998 100%);
  padding: 3rem 2rem;
  color: white;
  text-align: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  background: #ffffff;
  border-radius: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #4c669f;
  border: 4px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileContent = styled.div`
  padding: 2rem;
`;

const InfoSection = styled.div`
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

const Label = styled.h3`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.p`
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 500;
`;

const Profile = () => {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <PageTitle>Profile</PageTitle>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>{user?.name[0].toUpperCase()}</Avatar>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {user?.name.toUpperCase()}
          </h2>
        </ProfileHeader>
        <ProfileContent>
          <InfoSection>
            <InfoGrid>
              <InfoItem>
                <Label>Email</Label>
                <Value>{user?.email}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Name</Label>
                <Value>{user?.name}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Lab ID</Label>
                <Value>{user?.labId}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Last Active</Label>
                <Value>{"Today"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Status</Label>
                <Value>{"Active"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Role</Label>
                <Value>{"ADMIN"}</Value>
              </InfoItem>
            </InfoGrid>
          </InfoSection>
        </ProfileContent>
      </ProfileCard>
    </Container> 
  );
};

export default Profile;