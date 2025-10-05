export const initialStore = () => {
  return {
    BASE_URL: "https://playground.4geeks.com/contact/agendas/hereisphil/",
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    case "add_contact":
      const newContact = action.payload
      return { ...store, newContact }

    case "update_contact": {
      const updatedContact = action.payload;
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      };
    }

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    default:
      throw Error('Unknown action.');
  }
}
