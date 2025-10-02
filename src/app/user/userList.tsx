import React, { useEffect, useState } from 'react'

interface User {
    id: number,
    name: string,
    email: string,
}
const userList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                setLoading(true);
                setError(null);
                const resp = await fetch("/api/users");
                if(!resp.ok) {
                    throw new Error(`Error: ${resp.status} text: ${resp.statusText}`)
                }
                const data: User[] = await resp.json();
                setUsers(data);
            }
            catch(err: unknown) {
                if(err instanceof Error) {
                    setError(err.message)
                }else {
                    setError("an unknown error accured");
                } 
            } finally {
                    setLoading(false)
                }
        };
        fetchUsers()
    }, []);

    if(loading) {
        return <div>Loading users...</div>;
    }
    if(error) {
        return <div>Faild to load users: {error}</div>
    }

    return (
        <div>
            <h2>Users List</h2>
            {users.length === 0 ? ( <p>NO users found.</p>) : 
            (<ul>
                {users.map((user) => <li key={user.id}><strong>{user.name}</strong></li>)}
            </ul>)}
        </div>
    )
}

export default userList;