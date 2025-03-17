import React from 'react'

function  Third(props) {
    return (
        <div className="mt-5">
            <h1 className="text-center mb-4">Third Page</h1>

            <ul className="list-group shadow-sm">
                {
                    props.users.map(user => (
                        <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={user.id}
                        >
                        <span>
                            <strong>{user.id}.</strong> {user.name} - {user.work}
                        </span>
                            <span className="badge bg-dark rounded-pill">
                            ID: {user.id}
                        </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Third
