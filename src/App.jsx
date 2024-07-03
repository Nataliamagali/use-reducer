import React, { useReducer } from 'react';
import './App.css';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstName: {
                    value: action.payload,
                    error: action.payload ? null : 'El nombre es requerido'
                }
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastName: {
                    value: action.payload,
                    error: action.payload ? null : 'El apellido es requerido'
                }
            };
        case 'SET_EMAIL':
            const emailError = validateEmail(action.payload) ? null : 'El correo es inválido';
            return {
                ...state,
                email: {
                    value: action.payload,
                    error: emailError
                }
            };
        default:
            return state;
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Formulario enviado', state);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={state.firstName.value}
                        onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
                    />
                    {state.firstName.error && <p className="error">{state.firstName.error}</p>}
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        value={state.lastName.value}
                        onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
                    />
                    {state.lastName.error && <p className="error">{state.lastName.error}</p>}
                </div>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={state.email.value}
                        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    />
                    {state.email.error && <p className="error">{state.email.error}</p>}
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App; 
