export const initialStore=()=>{
  return{
    BASE_URL: "https://playground.4geeks.com/contact/agendas/hereisphil/",
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };
    
    case "add_contact":
      return {
        ...store,
        contacts: action.payload
      }
    default:
      throw Error('Unknown action.');
  }    
}
