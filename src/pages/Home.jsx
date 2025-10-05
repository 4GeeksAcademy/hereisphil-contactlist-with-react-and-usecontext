import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	// Fetch Contacts
	useEffect(() => {
		async function fetchContacts() {
			try {
				const response = await fetch(`${store.BASE_URL}contacts`);

				// Check if status is NOT ok (404, 500, etc.)
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

			} catch (error) {
				console.error("There was an error fetching contacts:", error.message);
			}
		}

		fetchContacts();
	}, []);

	// Function to delete a contact
	const deleteContact = async (id) => {
		if (window.confirm("Are you sure you want to delete this contact?")) {
			try {
				const response = await fetch(`${store.BASE_URL}contacts/${id}`, {
					method: "DELETE",
				});

				// Check if response was successful
				if (!response.ok) {
					if (response.status === 404) {
						throw new Error("Contact not found (404)");
					} else {
						throw new Error(`Server error: ${response.status}`);
					}
				}

				dispatch({ type: "delete_contact", payload: id });

				console.log("Contact deleted successfully!", data);
			} catch (error) {
				console.error("There was an error deleting the contact:", error.message);
			}
		}
	};

	return (
		<main className="container d-flex flex-column align-items-center">
			{store.contacts.length > 0 ? store.contacts.map((contact, index) =>
				<article key={contact.id} className="card mb-3 w-100" style={{ maxWidth: "540px" }}>
					<div className="row g-0">
						<div className="col-md-4">
							<img
								src={`/avatars/${(index % 7) + 1}.png`}
								className="img-fluid rounded-start"
								alt="Profile Pic"
							/>
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center">
									<h5 className="card-title">{contact.name}</h5>
									<div className="d-flex gap-3">
										<i
											className="fa-solid fa-pen text-black"
											style={{ cursor: "pointer" }}
											onClick={() => {
												navigate(`/add-contact/${contact.id}`);
											}}
										></i>
										<i
											className="fa-solid fa-trash text-danger"
											style={{ cursor: "pointer" }}
											onClick={() => {
												deleteContact(contact.id);
											}}
										></i>
									</div>
								</div>
								<ul className="list-group list-group-flush">
									<li className="card-text list-group-item text-secondary"><i className="fa-solid fa-location-dot"></i> {contact.address}</li>
									<li className="card-text list-group-item text-secondary"><i className="fa-solid fa-phone"></i> {contact.phone}</li>
									<li className="card-text list-group-item text-secondary"><i className="fa-solid fa-envelope"></i> {contact.email}</li>
								</ul>
							</div>
						</div>
					</div>
				</article>
			) :

				<article className="container text-center">
					<h2>No data found. Please create an agenda and contacts first.</h2>
					<a type="button" className="btn btn-warning" href="https://playground.4geeks.com/contact/docs" target="_blank">Go to 4Geeks Playground</a>
				</article>

			}
		</main>
	);
}; 