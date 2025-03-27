import { User } from '../App'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormEvent, useState } from 'react';
import Buttonx from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


interface Props {
    users: User[],
    addUser: (user: User) => void,
    setSelectedUser: (user: User) => void,
    selectedUser: User | null
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function Sidebar(props: Props) {

    const [open, setOpen] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")


    const saveUser = (e: FormEvent) => {
        e.preventDefault()
        let user: User = {
            id: props.users.length + 1,
            userName,
            phoneNumber: phone
        }
        props.addUser(user)
        reset()
    }

    function reset() {
        setUserName("")
        setPhone("")
        setOpen(false)
    }



    return (
        <div className='sidebar' >
            <button onClick={() => setOpen(true)} className='btn' >add user</button>
            {
                props.users.map(user =>
                    <Dropdown as={ButtonGroup}>
                        <Buttonx variant="success">Split Button</Buttonx>

                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )
}


<Modal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={style}>
        <form onSubmit={saveUser} >
            <h1>Modal</h1>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='user name' type="text" />
            <br />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='phone' type="text" />
            <button className='btn' >add user</button>
        </form>
    </Box>
</Modal>
        </div >
    )
}

export default Sidebar