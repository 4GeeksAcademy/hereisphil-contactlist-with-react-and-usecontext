import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [contactDetails, setContactDetails] = useState({});
    
    const navigate = useNavigate();

    async function addContact(name, phone, email, address) {
        try {
            const response = await fetch(`${store.BASE_URL}contacts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone,
                        email: email,
                        address: address,
                    })
                });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("There was an error:", error);
        }
    };

    return (
        <main>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Example: John Doe" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="example@gmail.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" placeholder="(000) 123-456" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="123 ABC Street" />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        const formData = new FormData()
                        const name = formData.get("name")
                        const phone = formData.get("phone")
                        const email = formData.get("email")
                        const address = formData.get("address")
                        addContact(name, phone, email, address);
                        navigate("/");
                    }}
                >
                    Add
                </button>
            </form>
            <button
                type="button"
                className="btn btn-warning m-5"
                onClick={() => {
                    navigate("/")
                }}
            >
                Return to Contacts
            </button>
        </main>
    )
}