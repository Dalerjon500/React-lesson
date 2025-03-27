
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^\+998[0-9]{9}$/, "Phone number must start with +998 and contain 9 digits")
        .required("Phone is required"),
    address: yup.string().required("Address is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

const App = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FieldValues) => {
        console.log("Form Data:", data);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg" style={{ width: "40rem" }}>
                <h2 className="text-center text-primary mb-4">Register Form</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" placeholder="First Name" {...register("firstName")} isInvalid={!!errors.firstName} />
                                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Last Name" {...register("lastName")} isInvalid={!!errors.lastName} />
                                <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" {...register("email")} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="tel" placeholder="Phone" {...register("phone")} isInvalid={!!errors.phone} />
                        <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Address" {...register("address")} isInvalid={!!errors.address} />
                        <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" {...register("password")} isInvalid={!!errors.password} />
                                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="password" placeholder="Confirm Password" {...register("confirmPassword")} isInvalid={!!errors.confirmPassword} />
                                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant="primary" className="w-100">Register</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default App;
