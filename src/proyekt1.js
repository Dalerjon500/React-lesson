import Button from "./Button";
import Text from "./Text";

const Proyekt1 = () => {
    return (
        <div className="container">
            <h1>My</h1>
            <Button color="danger" text="click me" />
            <Button color="success" text="click me" />
            <Button color="warning" text="click me" />

            <div className="d-flex gap-3 m-3 ">
                <Text color="primary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates!
                </Text>
                <Text color="danger">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, facere dolore. Fuga tempore dolorem ex at animi libero temporibus distinctio, deserunt laborum quo, nisi corrupti laboriosam corporis. Voluptatum, assumenda veritatis.
                </Text>
                <Text color="success">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam deleniti eveniet necessitatibus perferendis sapiente facilis sunt, iusto libero. Error quas autem cumque est nulla vero eligendi culpa repellat illum. Aperiam?
                </Text>
                <Text color="warning">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque mollitia consectetur eius non minima impedit consequatur explicabo. Pariatur nesciunt quidem impedit quasi delectus, officiis iste minus fugit velit ad voluptas?
                </Text>
            </div>
        </div>
    );
}

export default App;


















































