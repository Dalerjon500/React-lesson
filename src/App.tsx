        // import { useState } from "react"
        // import Books from "./components/Books";
        // import AddBooks from "./components/AddBooks";
        // import AboutUs from './components/AboutUs';
        // import 'bootstrap/dist/css/bootstrap.min.css';
        //
        //
        // export interface Book {
        //     id: number,
        //     name: string,
        //     author: string,
        //     description: string,
        //     price: number
        //     imgUrl: string
        // }
        //
        //
        //
        // function App() {
        //
        //
        //
        //     const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
        //
        //     const [page, setPage] = useState<string>("Books")
        //
        //
        //     const [books, setBooks] = useState<Book[]>([
        //         {
        //             id: 1,
        //             name: "Becoming Steve Jobs",
        //             author: "Brent Schlender and Rick Tetzeli",
        //             description: "A detailed account of Steve Jobs' journey from a brash entrepreneur to a visionary leader.",
        //             price: 1800 ,
        //             imgUrl: "https://m.media-amazon.com/images/I/81VStYnDGrL.jpg",
        //         },
        //
        //         {
        //             id: 2,
        //             name: "Harry Potter and the Chamber of Secrets",
        //             author: "J.K. Rowling",
        //             description: "Harry returns to Hogwarts and uncovers the mystery of the Chamber of Secrets.",
        //             price: 100,
        //             imgUrl: "https://cdn.europosters.eu/image/750/fanituotteet/harry-potter-harry-potter-i66984.jpg",
        //         },
        //         {
        //             id: 3,
        //             name: "Elon Musk",
        //             author: "Walter Isaacson",
        //             description: "It explores his role in companies like Tesla, SpaceX, Neuralink, and The Boring Company, highlighting his vision for the future and the controversies surrounding him.",
        //             price: 2000,
        //             imgUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1693900622i/198586342.jpg",
        //         },
        //         {
        //             id: 4,
        //             name: "Harry Potter and the Sorcerer's Stone",
        //             author: "J.K. Rowling",
        //             description: "A young wizard embarks on an adventure to discover his magical heritage and defeat a dark wizard.",
        //             price: 159,
        //             imgUrl: "https://www.universalorlando.com/webdata/k2/en/us/files/Images/gds/uor-wwohp-logo-3-kids-clouds-key-art-hero-b.jpg",
        //
        //         },
        //         {
        //             id: 5,
        //             name: "Harry Potter and the Prisoner of Azkaban",
        //             author: "J.K. Rowling",
        //             description: "Harry learns about his past and faces new challenges as he encounters Sirius Black.",
        //             price: 344,
        //             imgUrl: "https://musicart.xboxlive.com/7/26e15000-0000-0000-0000-000000000002/504/image.jpg",
        //         },
        //         {
        //             id: 6,
        //             name: "Harry Potter and the Goblet of Fire",
        //             author: "J.K. Rowling",
        //             description: "Harry competes in the dangerous Triwizard Tournament and faces Voldemort's return.",
        //             price: 155,
        //             imgUrl: "https://m.media-amazon.com/images/I/819HhgLM4GL._AC_UF1000,1000_QL80_.jpg",
        //         },
        //         {
        //             id: 7,
        //             name: "Harry Potter and the Order of the Phoenix",
        //             author: "J.K. Rowling",
        //             description: "Harry battles the Ministry of Magic and forms Dumbledore's Army to fight Voldemort.",
        //             price: 558,
        //             imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhCy1uD513lT4OHD2pJg05636OkIX234jYJZ9YqmdGxzI2k26aAjvDYZsQ1I3-X4Onnw&usqp=CAU",
        //         }
        //     ]);
        //     const saveBook = (data: Book) => {
        //         if (data.id) {
        //             setBooks(books.map((book) => (book.id === data.id ? data : book)));
        //         } else {
        //             const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
        //             setBooks([...books, { ...data, id: newId }]);
        //         }
        //         setSelectedBook(undefined);
        //     };
        //
        //     const editBook = (book: Book) => {
        //         setSelectedBook(book);
        //     }
        //
        //
        //     return (
        //         <>
        //
        //
        //             <header className="header shadow-sm p-3 d-flex justify-content-between align-items-center">
        //                 <div className="d-flex align-items-center">
        //                     <h1 className="">
        //                          Book Shop
        //                     </h1>
        //                 </div>
        //                 <div className="icons d-flex gap-2">
        //                     <button
        //                         className={`btn btn-outline-dark px-4 ${page === "AddBooks" ? "active" : ""}`}
        //                         onClick={() => setPage("AddBooks")}
        //                     >
        //                         Add Books
        //                     </button>
        //                     <button
        //                         className={`btn btn-outline-dark  px-4 ${page === "Books" ? "active" : ""}`}
        //                         onClick={() => setPage("Books")}
        //                     >
        //                         Books
        //                     </button>
        //                     <button
        //                         className={`btn btn-outline-dark px-4 ${page === "AboutUs" ? "active" : ""}`}
        //                         onClick={() => setPage("AboutUs")}
        //                     >
        //                         About Us
        //                     </button>
        //                 </div>
        //             </header>
        //             <div className="container mt-5">
        //                 {page === "Books" && <Books editBook={editBook} books={books} deleteBook={( id: number ) => setBooks(books.filter(book => book.id !== id))} />}
        //                 {page === "AddBooks" && <AddBooks books={books} selectedBook={selectedBook} saveBook={saveBook} setSelectedBook={setSelectedBook} />      }
        //                 {page === "AboutUs" && <AboutUs />}
        //             </div>
        //         </>
        //     )
        // }
        //
        // export default App
        //























        import Header from "./components/Header"
        import Cards from "./components/Cards"
        import CreateContext from "./context/CreateContext"
        import "bootstrap/dist/css/bootstrap.min.css"
        import './App.css';

        function App() {
            return <div className="container ota-div w-50">
                <CreateContext>
                    <Header/>
                    <Cards/>
                </CreateContext>
            </div>
        }

        export default App
