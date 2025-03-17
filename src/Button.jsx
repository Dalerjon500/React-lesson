
function Button(props) {
    return (
        <button className={`btn btn-${props.color}`}>{props.text}</button>
    );
}

export default Button;
