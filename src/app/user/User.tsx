"use client"
import React, { useEffect, useState } from "react";
import styles from "./User.module.css";

interface UserType {
  id: number;
  name: string;
  email: string;
}

export default function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Dummy API call
        const resp = await fetch("/api/users");
        if (!resp.ok) {
          throw new Error(`Error: ${resp.status} text: ${resp.statusText}`);
        }

        const data: UserType[] = await resp.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className={styles.loadingText}>Loading users...</div>;
  if (error) return <div className={styles.loadingTextFail}>Failed to load users: {error}</div>;

  return (
    <div className={styles.userList}>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
