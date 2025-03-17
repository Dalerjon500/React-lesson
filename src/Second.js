import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Second(props) {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setCurrentUser(null);
    };

    const handleShow = () => setShow(true);

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            id: editMode ? currentUser.id : props.users.length + 1,
            name: e.target.name.value,
            age: e.target.age.value,
            work: e.target.work.value,
        };

        if (editMode) {
            const updatedUsers = props.users.map(u => (u.id === user.id ? user : u));
            props.setUsers(updatedUsers);
        } else {
            props.addUser(user);
        }

        handleClose();
    }

    function deleteUser(id) {
        const updatedUsers = props.users.filter(user => user.id !== id);
        props.setUsers(updatedUsers);
    }

    function editUser(user) {
        setEditMode(true);
        setCurrentUser(user);
        setShow(true);
    }

    return (
        <div className="mt-3">
            <h1>Second Page</h1>
            <button className="btn btn-dark" onClick={handleShow}>Add User</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Work</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.work}</td>
                            <td>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => deleteUser(user.id)}>
                                    Delete
                                </button>
                                <button
                                    className="btn btn-dark ms-2"
                                    onClick={() => editUser(user)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit User' : 'Add New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                id="name"
                                name="name"
                                placeholder="Enter Name..."
                                type="text"
                                className="form-control"
                                defaultValue={editMode && currentUser ? currentUser.name : ''}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <input
                                id="age"
                                name="age"
                                placeholder="Enter Age..."
                                type="number"
                                className="form-control"
                                defaultValue={editMode && currentUser ? currentUser.age : ''}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="work" className="form-label">Work:</label>
                            <input
                                id="work"
                                name="work"
                                placeholder="Enter Work..."
                                type="text"
                                className="form-control"
                                defaultValue={editMode && currentUser ? currentUser.work : ''}
                            />
                        </div>
                        <div className="text-end">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {editMode ? 'Save Changes' : 'Add User'}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Second;


