import { Dispatch, useReducer } from "react"
import { MyContext } from "../context/MyContext"
import { ReactNode } from 'react';

export interface Tips {
    id: number
    name: string
    lastName: string
    phone: string
    address: string
}

interface TypeState {
    tips: Tips[]
}

type DeleteAction = {
    type: "DELETE"
    payload: number
}

type DeleteAllAction = {
    type: "DELETE_ALL"
}

type Action = DeleteAction | DeleteAllAction

export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}
function reducer(state: TypeState, action: Action): TypeState {
    switch (action.type) {
        case "DELETE":
            return {
                ...state,
                tips: state.tips.filter((tip) => tip.id !== action.payload),
            };
        case "DELETE_ALL":
            return {
                ...state,
                tips: [],
            };
        default:
            return state;
    }
}


function CreateContextPro({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(reducer,{
        tips : [
            { id: 1, name: "Chidi", lastName: "Anagonye", phone: "555-366-8987", address: "St. John's University, Sydney, Australia" },
            { id: 2, name: "Tahani", lastName: "Al-Jamil", phone: "555-276-7991", address: "1 Lancaster Terrace, London, England" },
            { id: 3, name: "Jason", lastName: "Mendoza", phone: "555-113-8388", address: "779 William St, Miami, Florida" },
            { id: 4, name: "Eleanor", lastName: "Shellstrop", phone: "555-123-4567", address: "1234 Elm St, Los Angeles, CA" },
            { id: 5, name: "Michael", lastName: "Scofield", phone: "555-987-6543", address: "5678 Oak St, Chicago, IL" },
            { id: 6, name: "Sara", lastName: "Tancredi", phone: "555-555-5555", address: "9101 Maple Ave, Seattle, WA" },
            { id: 7, name: "Lincoln", lastName: "Burrows", phone: "555-444-4444", address: "1213 Pine St, Boston, MA" },
            { id: 8, name: "Veronica", lastName: "Donovan", phone: "555-222-2222", address: "1415 Birch St, San Francisco, CA" },
            { id: 9, name: "T-Bag", lastName: "Bagwell", phone: "555-333-3333", address: "1617 Cedar St, New York, NY" },
        ]
    } )

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    )
}
export default CreateContextPro



