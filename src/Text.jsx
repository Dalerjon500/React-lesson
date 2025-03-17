
function Text (props) {
    return (
        <div className={`card text-${props.color}`}>
            <div className="card-header">
                <h1>Title</h1>
            </div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    );
}

export default Text
