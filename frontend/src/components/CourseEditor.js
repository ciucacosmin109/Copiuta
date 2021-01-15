import React from "react";
import Courses from "../data/Courses";

import "./CourseEditor.css";

import { Form, Button, Card, Collapse, Spinner, Alert } from "react-bootstrap";
import { CaretDown, CaretUp } from 'react-bootstrap-icons';
import NoteList from "./NoteList";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",

            open: false,
        };
    }
    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.props.editable) {
            if (this.props.onSaveClicked) {
                this.props.onSaveClicked(null);
            }
            return;
        }

        const { name, description } = this.state;
        if (!name || name.length === 0) {
            return;
        }

        const course = {
            name: name,
            description: description === "" ? null : description,
        };
        if (this.props.courseId) {
            course.id = this.props.courseId;
        }

        if (this.props.onSaveClicked) {
            this.props.onSaveClicked(course);
        }
    };
    handleCancel = () => {
        if (this.props.onSaveClicked) {
            this.props.onSaveClicked(null);
        }
    }
    componentDidMount() {
        if (!this.props.courseId) {
            return;
        }

        Courses.getCourse(this.props.courseId).then((res) => {
            if (res.ok) {
                const course = res.result;
                this.setState({ name: course.name, description: course.description });
            }
            if (this.props.onCourseFetched) {
                this.props.onCourseFetched(res);
            }
        });
    }

    render() {
        return (
            <div className="CourseEditor">
                <Form className="course-form" onSubmit={this.handleSubmit}>
                    {this.props.error ?
                        <Form.Group controlId="formBasicError">
                            <Alert style={{ margin: 0 }} variant='danger'>{this.props.error}</Alert>
                        </Form.Group>
                        : <></>
                    }
                    <Form.Group controlId="formBasic">
                        <Form.Label className="label-curs">Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={this.state.name}
                            readOnly={!this.props.editable}
                            onChange={this.handleChange}

                            type="text"
                            placeholder="Enter a course name"
                            disabled={this.props.loading ? true : false}

                            isInvalid={this.state.name == null || !(this.state.name.length > 0)}
                            required
                        />
                    </Form.Group>

                    {this.props.editable || (this.state.name && this.state.name.length > 0) ?
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                value={this.state.description}
                                readOnly={!this.props.editable}
                                onChange={this.handleChange}

                                type="text"
                                placeholder="Enter a course description"
                                disabled={this.props.loading ? true : false}
                            />
                        </Form.Group> : <></>
                    }

                    {this.props.courseId ?
                        <Form.Group controlId="formBasicNotes">
                            <Form.Label className="label-curs">Notes</Form.Label>
                            <Card size="sm">
                                <Card.Header onClick={this.toggleCollapse}>
                                    <Button variant="link" size="sm" onClick={this.toggleCollapse}>
                                        {this.state.open ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                                    </Button>
                                </Card.Header>
                                <Collapse in={this.state.open}>
                                    <Card.Body>
                                        <NoteList courseId={this.props.courseId} />
                                    </Card.Body>
                                </Collapse>
                            </Card>
                        </Form.Group>
                        : <></>
                    }

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={this.props.loading ? true : false} >

                        {this.props.loading ?
                            <>
                                <Spinner
                                    animation="border"
                                    size="sm"
                                />
                                {' Loading ...'}
                            </>
                            : (this.props.editable ? 'Save' : 'Back')
                        }
                    </Button> {" "}
                    {this.props.editable ?
                        <Button
                            variant="secondary"
                            onClick={this.handleCancel} >

                            Cancel
                        </Button> : <></>
                    }
                </Form>
            </div>
        );
    }
}
export default CourseEditor;
