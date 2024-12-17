import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useUser } from './UserContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const PasswordToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #4c669f;

  &:hover {
    color: #3b5998;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1a237e;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 90%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid ${props => props.focused ? '#4c669f' : '#e1e1e1'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #4c669f;
    box-shadow: 0 0 0 3px rgba(76, 102, 159, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4c669f 0%, #3b5998 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 102, 159, 0.4);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const ToggleText = styled.p`
  color: #4c669f;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #3b5998;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

// Component logic
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [labId, setLabId] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  const { setUser } = useUser();
  const { user } = useUser ();
  const db = getFirestore();
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (user) {
  //     navigate('/dashboard'); // Redirect to dashboard if user is logged in
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "admins", user.uid), { email, password, name, labId });
        setUser({ email, name, labId });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "admins", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ email, ...userData });
        } else {
          setError('User data not found.');
        }
      }
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormContainer>
          <Logo>{isSignup ? 'Create Account' : 'Welcome Back'}</Logo>
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focused={focusedInput === 'name'}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput('')}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Lab ID"
                    value={labId}
                    onChange={(e) => setLabId(e.target.value)}
                    focused={focusedInput === 'labId'}
                    onFocus={() => setFocusedInput('labId')}
                    onBlur={() => setFocusedInput('')}
                  />
                </InputGroup>
              </>
            )}
            <InputGroup>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focused={focusedInput === 'email'}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput('')}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focused={focusedInput === 'password'}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
              />
              <PasswordToggle onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
            </Button>
          </Form>
          <ToggleText onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account? Sign in' : 'Need an account? Create one'}
          </ToggleText>
        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default Login;
