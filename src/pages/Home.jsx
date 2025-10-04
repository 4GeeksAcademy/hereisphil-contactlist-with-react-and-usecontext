import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	// Fetch Contacts
	useEffect(() => {
		async function fetchContacts() {
			try {
				const response = await fetch(
					`${store.BASE_URL}contacts`
				);
				const data = await response.json();
				const contactData = data.contacts;
				dispatch({ type: "set_contacts", payload: contactData });
			} catch (error) {
				console.log("There was an error:", error);
			}
		} fetchContacts();
	}, [])

	return (
		<main className="container">
			{store.contacts.map((contact, index) =>
				<article key={contact.id} className="card mb-3" style={{maxWidth: "540px"}}>
					<div className="row g-0">
						<div className="col-md-4">
							<img 
							src={`/avatars/${(index % 7)+1}.png`}
							className="img-fluid rounded-start" 
							alt="Profile Pic"
							/>
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<h5 className="card-title">{contact.name}</h5>
								<ul className="list-group list-group-flush">
									<li className="card-text list-group-item text-secondary"><i className="fa-solid fa-location-dot"></i> {contact.address}</li>
									<li className="card-text list-group-item text-secondary"><i className="fa-solid fa-phone"></i> {contact.phone}</li>
									<li className="card-text list-group-item text-secondary"><i className="fa-solid fa-envelope"></i> {contact.email}</li>
								</ul>
							</div>
						</div>
					</div>
				</article>
			)}
		</main>
	);
}; 