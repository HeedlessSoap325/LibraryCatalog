export default function SimpleInput({func, value, params, setter, required}){
    return(
        <input
            className={`search-${func.toString().toLowerCase()} text-input`}
            type={"text"}
            placeholder={func}
            value={value}
            required={required}
            onChange={(e) => setter({...params, [func.toString().toLowerCase()]: e.target.value})}
        />
    );
}