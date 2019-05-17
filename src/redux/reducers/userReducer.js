

const initialState = {
    name: "",
    email: "",
    age: "",
    sex: "",
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        default:
            return state;
    }
}