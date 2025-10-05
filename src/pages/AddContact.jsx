import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";

export const AddContact = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { contactId } = useParams();
    const [loadedContact, setLoadedContact] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      id: null
    });
    useEffect(() => {
        if (contactId) {
            async function fetchContacts() {
                try {
                    const response = await fetch(`${store.BASE_URL}contacts`);
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error("Contacts not found (404)");
                        } else {
                            throw new Error(`Server error: ${response.status}`);
                        }
                    }
                    const data = await response.json();
                    const contactData = data.contacts;
                    dispatch({ type: "set_contacts", payload: contactData });
                    setLoadedContact(contactData.find((contact => contact.id === Number(contactId))))
                } catch (error) {
                    console.error("There was an error fetching contacts:", error.message);
                }
            }
            fetchContacts();
        }
    }, []);
    async function updateContact() {
        try {
            const response = await fetch(`${store.BASE_URL}contacts/${contactId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loadedContact)
                });
            dispatch({
                type: "update_contact",
                payload: loadedContact
            });
            const data = await response.json();
            console.log(data);
            navigate("/");
        } catch (error) {
            console.log("There was an error:", error);
        }
    };



    const [contactDetails, setContactDetails] = useState({
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactAddress: ""
    });

    async function addContact() {
        const postData = {
            name: contactDetails.contactName,
            email: contactDetails.contactEmail,
            phone: contactDetails.contactPhone,
            address: contactDetails.contactAddress
        }

        try {
            const response = await fetch(`${store.BASE_URL}contacts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });
            dispatch({
                type: "add_contact",
                payload: {
                    name: contactDetails.contactName,
                    email: contactDetails.contactEmail,
                    phone: contactDetails.contactPhone,
                    address: contactDetails.contactAddress
                }
            });
            const data = await response.json();
            console.log(data);
            navigate("/");
        } catch (error) {
            console.log("There was an error:", error);
        }
    };

    return (
        <main>
            {contactId ?

                <form className="container"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateContact();
                    }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={(e) => setLoadedContact({ ...loadedContact, name: e.target.value })}
                            value={loadedContact.name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => setLoadedContact({ ...loadedContact, email: e.target.value })}
                            value={loadedContact.email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            onChange={(e) => setLoadedContact({ ...loadedContact, phone: e.target.value })}
                            value={loadedContact.phone}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            onChange={(e) => setLoadedContact({ ...loadedContact, address: e.target.value })}
                            value={loadedContact.address}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                : <form className="container"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addContact();
                    }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Example: John Doe"
                            onChange={(e) => setContactDetails({ ...contactDetails, contactName: e.target.value })}
                            value={contactDetails.contactName}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="example@gmail.com"
                            onChange={(e) => setContactDetails({ ...contactDetails, contactEmail: e.target.value })}
                            value={contactDetails.contactEmail}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="(000) 123-456"
                            onChange={(e) => setContactDetails({ ...contactDetails, contactPhone: e.target.value })}
                            value={contactDetails.contactPhone}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="123 ABC Street"
                            onChange={(e) => setContactDetails({ ...contactDetails, contactAddress: e.target.value })}
                            value={contactDetails.contactAddress}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            }
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