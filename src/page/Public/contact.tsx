import { useEffect, useState } from "react";
import contactData from "../../../public/contact.json";

export default function Contact() {
  const [contact, setContact] = useState({ phone: "", email: "" });

  useEffect(() => {
    setContact(contactData); // Load imported JSON
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const updateJsonLocally = () => {
    console.log("Updated JSON:", contact);
  };

  return (
    <div>
      <h1>Contact Page</h1>

      <input
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
        name="email"
        value={contact.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <button onClick={updateJsonLocally}>Update JSON</button>

      <pre>{JSON.stringify(contact, null, 2)}</pre>
    </div>
  );
}
