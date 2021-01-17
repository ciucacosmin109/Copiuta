import React from "react";
import Groups from "../data/Groups";
import GroupStudents from "../data/GroupStudents";

import "./GroupMembersEditor.css";

import { Form, Button, Card, Collapse, Spinner, Alert, ListGroup } from "react-bootstrap";
import { CaretDown, CaretUp } from 'react-bootstrap-icons';
import Students from "../data/Students";

class GroupMembersEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            allStudents: [],
            students: [],

            open: true,

            loading: true,
            error: null
        };
    }
    async componentDidMount() {
        // Get group 
        const gr = await Groups.getGroup(this.props.groupId);
        if (!gr.ok) {
            this.setState({ loading: false, error: "Group: " + gr.message });
            return;
        }

        // Get all students
        const sr = await Students.getAllStudents();
        if (!sr.ok) {
            this.setState({ loading: false, error: sr.message });
            return;
        }

        // Get members
        const mr = await Students.getAllStudentsByGroupId(this.props.groupId);
        if (!mr.ok) {
            this.setState({ loading: false, error: mr.message });
            return;
        }

        this.setState({
            loading: false,
            error: null,

            name: gr.result.name,
            allStudents: sr.result,
            students: mr.result
        });
    }
    toggleCollapse = () => this.setState({ open: !this.state.open });

    isChecked = (index) => {
        return this.state.students.map(x => x.id).includes(this.state.allStudents[index].id);
    }
    handleCheck = (event, index) => {
        if (event.target.checked) {
            this.setState({ students: [...this.state.students, this.state.allStudents[index]] });
        } else {
            this.setState({ students: this.state.students.filter(x => x.id !== this.state.allStudents[index].id) });
        }
    }

    // Save changes
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });

        const resR = await GroupStudents.removeAllStudentsFromGroup(this.props.groupId);
        if (!resR.ok) {
            this.setState({ error: resR.message });
        }

        for (let i = 0; i < this.state.students.length; i++) {
            const share = this.state.students[i];

            const res = await GroupStudents.addStudentToGroup(share.id, this.props.groupId);
            if (!res.ok) {
                this.setState({ error: res.message });
            }
        }
        this.setState({ loading: false });

        if (this.props.onSaveFinished)
            this.props.onSaveFinished(this.state.students);
    };

    // Html 
    render() {
        return (
            <div className="GroupMembersEditor">
                <Form className="course-form" onSubmit={this.handleSubmit}>
                    {this.props.error ?
                        <Form.Group controlId="formBasicError">
                            <Alert style={{ margin: 0 }} variant='danger'>{this.props.error}</Alert>
                        </Form.Group>
                        : <></>
                    }
                    <Form.Group controlId="formBasicNotes">
                        <Form.Label className="label-curs">{this.state.name}</Form.Label>
                        <Card size="sm">
                            <Card.Header onClick={this.toggleCollapse}>
                                <Button variant="link" size="sm" onClick={this.toggleCollapse}>
                                    {this.state.open ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                                </Button>
                            </Card.Header>
                            <Collapse in={this.state.open}>
                                <Card.Body>
                                    <ListGroup variant="flush" size="sm">
                                        {this.state.allStudents.map((stud, index) =>
                                            <ListGroup.Item key={index}>
                                                <span>{stud.firstName + " " + stud.lastName}</span>

                                                <Form.Switch id={"switch-" + index}
                                                    style={{ float: "right" }}
                                                    checked={this.isChecked(index)}
                                                    onChange={event => this.handleCheck(event, index)}
                                                    label="Add" />
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Collapse>
                        </Card>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={this.state.loading ? true : false} >

                        {this.state.loading ?
                            <>
                                <Spinner
                                    animation="border"
                                    size="sm"
                                />
                                {' Loading ...'}
                            </>
                            : "Save"
                        }
                    </Button>

                </Form>
            </div>
        );
    }
}
export default GroupMembersEditor;
