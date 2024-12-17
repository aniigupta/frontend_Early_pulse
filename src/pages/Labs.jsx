import React, { useState } from 'react';
import axios from 'axios';

const AddLab = () => {
    const [labDetails, setLabDetails] = useState({
        name: '',
        // description: '',
        // location: '',
        address: '',
        contact: '',
        price: '',
        services: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLabDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting lab details:', labDetails);
        try {
            const response = await axios.post('http://localhost:8081/api/labs', labDetails);
            if (response.status === 201) {
                setMessage('Lab added successfully!');
                setLabDetails({
                    name: '',
                    address: '',
                    contact: '',
                    price: '',
                    services: ''
                });
            } else {
                setMessage('Failed to add lab.');
            }
        } catch (error) {
            console.error("There was an error adding the lab:", error);
            setMessage('Error adding lab.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add New Lab</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Lab Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={labDetails.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={labDetails.address}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={labDetails.contact}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={labDetails.price}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Services:</label>
                    <input
                        type="text"
                        name="services"
                        value={labDetails.services}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Add Lab</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '90%',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '20px',
        color: '#444',
    },
    form: {
        display: 'grid',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '16px',
        marginBottom: '5px',
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        transition: 'border-color 0.3s ease-in-out',
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        resize: 'none',
        height: '100px',
        transition: 'border-color 0.3s ease-in-out',
    },
    inputFocus: {
        borderColor: '#007BFF',
    },
    button: {
        padding: '12px 20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out',
        textAlign: 'center',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    message: {
        textAlign: 'center',
        marginTop: '20px',
        color: '#28a745',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    '@media (max-width: 768px)': {
        form: {
            gap: '15px',
        },
        title: {
            fontSize: '24px',
        },
    },
};

export default AddLab;
