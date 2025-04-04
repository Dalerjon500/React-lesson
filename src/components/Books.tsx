import { Book } from "../App";
import { FaUser, FaDollarSign, FaEdit, FaTrash } from "react-icons/fa";

interface Props {
    books: Book[];
    editBook: (book: Book) => void;
    deleteBook: (id: number) => void;
}

function Books({ books, editBook, deleteBook }: Props) {
    return (
        <div className="row " style={{ marginTop: "50px" }}>
            {books.map((book) => (
                <div key={book.id} className="col-md-3 col-sm-6 mb-4">
                    <div className="card shadow-sm h-100 p-2 border-0">
                        <img
                            src={book.imgUrl}
                            className="card-img-top"
                            alt={book.name}
                            style={{
                                height: "200px",
                                objectFit: "contain",
                                backgroundColor: "#f8f9fa",
                            }}
                        />
                        <div className="card-body d-flex flex-column">
                            <h6 className="card-title text-truncate">
                                {book.name}
                            </h6>
                            <hr />
                            <p className="card-text text-muted">{book.description}</p>
                            <p className="card-text mb-1 d-flex align-items-center">
                                <FaUser className="me-2" />
                                Author: {book.author}
                            </p>
                            <p className="card-text d-flex align-items-center">
                                <FaDollarSign className="me-2 " />
                                Price: {book.price} $
                            </p>
                            <div className="mt-auto d-flex justify-content-center align-items-center gap-2">
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => editBook(book)}
                                    title="Edit"
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteBook(book.id)}
                                    title="Delete"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Books;
