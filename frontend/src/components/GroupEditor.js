import React from "react";
import Groups from "../data/Groups";

import "./GroupEditor.css";

import { Form, Button, Card, Collapse, Spinner, Alert } from "react-bootstrap";
import { CaretDown, CaretUp } from 'react-bootstrap-icons';
import NoteList from "./NoteList";

class GroupEditor extends React.Component {
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

        const g = {
            name: name,
            description: description === "" ? null : description,
        };
        if (this.props.groupId) {
            g.id = this.props.groupId;
        }

        if (this.props.onSaveClicked) {
            this.props.onSaveClicked(g);
        }
    };
    handleCancel = () => {
        if (this.props.onSaveClicked) {
            this.props.onSaveClicked(null);
        }
    }
    componentDidMount() {
        if (!this.props.groupId) {
            return;
        }

        Groups.getGroup(this.props.groupId).then((res) => {
            if (res.ok) {
                const g = res.result;
                this.setState({ name: g.name, description: g.description });
            }
            if (this.props.onGroupFetched) {
                this.props.onGroupFetched(res);
            }
        });
    }

    render() {
        return (
            <div className="GroupEditor">
                <Form className="group-form" onSubmit={this.handleSubmit}>
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
                            placeholder="Enter a group name"
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
                                placeholder="Enter a group description"
                                disabled={this.props.loading ? true : false}
                            />
                        </Form.Group> : <></>
                    }

                    {this.props.groupId ?
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
                                        <NoteList groupId={this.props.groupId} />
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
export default GroupEditor;
