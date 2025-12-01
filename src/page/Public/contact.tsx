import { useEffect, useState } from "react";
import { supabase } from "../../service/supabase";

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profile: string;
}

export default function Contact() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // RANDOM USERNAME GENERATOR
  const generateRandomUsername = () => {
    const random = Math.random().toString(36).substring(2, 10);
    const adjectives = ["fast", "cool", "smart", "red", "blue", "happy"];
    const animals = ["lion", "panda", "tiger", "eagle", "fox", "cat"];

    return (
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      "_" +
      animals[Math.floor(Math.random() * animals.length)] +
      "_" +
      random
    );
  };

  // GET USERS
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const { data, error } = await supabase.from("User").select("*");

      if (error) {
        setErrorMsg(error.message);
      } else {
        setUsers(data);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  // INSERT USER
  const insertUser = async () => {
    const newUser = {
      username: generateRandomUsername(),
      firstname: "John",
      lastname: "Doe",
      profile: "profile.png",
    };

    const { data, error } = await supabase.from("User").insert([newUser]).select();

    if (error) {
      setErrorMsg(error.message);
    } else if (data) {
      setUsers((prev) => [...prev, data[0]]);
    }
  };

  // UPDATE USER
  const updateUser = async (id: string) => {
    const { data, error } = await supabase
      .from("User")
      .update({ firstname: "UpdatedName" })
      .eq("id", id)
      .select();

    if (error) {
      setErrorMsg(error.message);
    } else if (data) {
      setUsers((prev) => prev.map((u) => (u.id === id ? data[0] : u)));
    }
  };

  // DELETE USER
  const deleteUser = async (id: string) => {
    const { error } = await supabase.from("User").delete().eq("id", id);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase + React + TypeScript</h1>

      {errorMsg && <p style={{ color: "red" }}>Error: {errorMsg}</p>}
      {loading && <p>Loading...</p>}

      <button onClick={insertUser}>Add Random User</button>

      {users.map((u) => (
        <div key={u.id} style={{ marginTop: 10 }}>
          <strong>{u.username}</strong> - {u.firstname} ({u.lastname})
          <button onClick={() => updateUser(u.id)}>Update</button>
          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
