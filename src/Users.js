import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";



const Users =() =>{
    const [users, setUsers] = useState([]);
    const [submited, setSubmited] = useState(false);
    const[selectedUser, setSelectedUser] = useState({}); 
    const [isEdit, setIsEdit] = useState(false);

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers =() =>{
        Axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response?.data?.response || []);
            })
            .catch(error =>{
                console.error("Axios error: " + error);
            });
    }

    const addUser =(data) =>{
        setSubmited(true);

        const payload ={
            id: data.id,
            name : data.name,

        }
        Axios.post('http://localhost:3001/api/createuser',payload)
            .then(() => {
                getUsers();
                setSubmited(false);
                isEdit(false);
            })
            .catch(error =>{
             console.error("Axios error: " + error);
            });
    }

    const updateUser =(data) => {
        setSubmited(true);

        const payload ={
            id: data.id,
            name : data.name,

        }

        Axios.post('http://localhost:3001/api/updateuser',payload)
            .then(() => {
                getUsers();
                setSubmited(false);
                isEdit(false);
            })
            .catch(error =>{
             console.error("Axios error: " + error);
            });
    }

    const deleteUser =(data) => {

        Axios.post('http://localhost:3001/api/deleteuser',data)
            .then(() => {
                getUsers();
            })
            .catch(error =>{
             console.error("Axios error: " + error);
            });
    }

    return(
        <Box
            sx={{
                width: 'calc(100%-100px)',
                margin:'auto',
                marginTop: '100px',
            }}
        >
            <UserForm
                addUser={addUser}
                updateUser={updateUser}
                submited={submited}
                data={selectedUser}
                isEdit={isEdit}
            />
            <UsersTable 
                rows={users}
                selectedUser={data =>{
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteUser={data => window.confirm('Are you sure you want to delete') && deleteUser(data)}
            />
        </Box>
       
    );
}

export default Users;