import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "../App";
import { useEffect } from "react";

const bookSchema = z.object({
    name: z.string().min(1, "Name is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().min(1, "Price must be greater than 0"),
    imgUrl: z.string().url("Invalid URL format"),
});

interface Props {
    books: Book[];
    saveBook: (book: Book) => void;
    selectedBook: Book | undefined;
    setSelectedBook: (book: Book | undefined) => void;
}

type BookFormData = z.infer<typeof bookSchema>;

function AddBooks({ saveBook, selectedBook, setSelectedBook }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
    });

    useEffect(() => {
        if (selectedBook) {
            reset(selectedBook);
        } else {
            reset({
                name: "",
                author: "",
                description: "",
                price: 1,
                imgUrl: "",
            });
        }
    }, [selectedBook, reset]);

    const onSubmit: SubmitHandler<BookFormData> = (data: BookFormData) => {
        if (selectedBook) {
            saveBook({ ...selectedBook, ...data });
        } else {
            saveBook({ ...data, id: 0 });
        }

        setSelectedBook(undefined);
        reset();
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "600px", width: "100%" }}>
                <h1 className="card-header text-center bg-gradient text-white rounded-top-4 py-3" style={{ background: "#007bff" }}>
                    {selectedBook ? "Edit Book" : "Add Book"}
                </h1>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {[
                            { label: "Name", id: "name", type: "text" },
                            { label: "Author", id: "author", type: "text" },
                            { label: "Description", id: "description", type: "textarea" },
                            { label: "Price", id: "price", type: "number" },
                            { label: "Image URL", id: "imgUrl", type: "text" }
                        ].map(({ label, id, type }) => (
                            <div className="mb-4" key={id}>
                                <label htmlFor={id} className="form-label fw-bold">{label}</label>
                                {type === "textarea" ? (
                                    <textarea {...register(id as keyof BookFormData)}
                                              className={`form-control form-control-lg ${errors[id as keyof BookFormData] ? "is-invalid" : ""}`}
                                              id={id} rows={4} placeholder={`Enter ${label.toLowerCase()}`} />
                                ) : (
                                    <input {...register(id as keyof BookFormData)}
                                           type={type}
                                           className={`form-control form-control-lg ${errors[id as keyof BookFormData] ? "is-invalid" : ""}`}
                                           id={id} placeholder={`Enter ${label.toLowerCase()}`} />
                                )}
                                {errors[id as keyof BookFormData] && (
                                    <div className="invalid-feedback">{errors[id as keyof BookFormData]?.message}</div>
                                )}
                            </div>
                        ))}

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4"
                                    onClick={() => { setSelectedBook(undefined); reset(); }}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-lg px-5">
                                {selectedBook ? "Update Book" : "Add Book"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBooks;
