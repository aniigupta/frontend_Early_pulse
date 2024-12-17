import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaUserPlus, FaUsers, FaTachometerAlt, FaSignOutAlt, FaFlask } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background: #1a237e;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  overflow-y: auto;
  z-index: 1000;
`;

const Logo = styled.div`
  padding: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
`;

const NavItems = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
`;

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const navItems = [
    { path: '/dashboard', icon: FaTachometerAlt, text: 'Dashboard' },
    { path: '/profile', icon: FaUser, text: 'Profile' },
    { path: '/user-requests', icon: FaUserPlus, text: 'New User Requests' },
    { path: '/user-management', icon: FaUsers, text: 'Total Users' },
    { path: '/labs', icon: FaFlask, text: 'Labs' },  
  ];

  return (
    <SidebarContainer>
      <Logo>Early Pulse</Logo>
      <NavItems>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            active={activeItem === item.path ? 1 : 0}
            onClick={() => setActiveItem(item.path)}
          >
            <Icon>
              <item.icon />
            </Icon>
            <Text active={activeItem === item.path ? 1 : 0}>
              {item.text}
            </Text>
          </NavItem>
        ))}
        <Divider />
        <NavItem to="/login" onClick={() => setActiveItem('/login')}>
          <Icon>
            <FaSignOutAlt />
          </Icon>
          <Text>Logout</Text>
        </NavItem>
      </NavItems>
    </SidebarContainer>
  );
};

export default Sidebar;
