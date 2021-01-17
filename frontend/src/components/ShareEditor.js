import React from "react";
import Groups from "../data/Groups";
import Login from "../data/Login";

import "./ShareEditor.css";

import { Form, Button, Card, Collapse, Spinner, Alert, ListGroup } from "react-bootstrap";
import { CaretDown, CaretUp, Share } from 'react-bootstrap-icons';
import GroupNotes from "../data/GroupNotes";

class ShareEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studId: "0",
            allGroups: [],
            groups: [],

            contentOpen: false,
            open: true,

            loading: true,
            error: null
        };
    }
    async componentDidMount() {
        // Get the current user id
        const studRes = await Login.getCurrentLoggedIn();
        if (!studRes.ok) {
            this.setState({ loading: false, error: studRes.message });
            return;
        }

        // Get all groups
        const res = await Groups.getAllGroupsByStudentId(studRes.stud.id);
        if (!res.ok) {
            this.setState({ loading: false, error: res.message });
            return;
        }

        // Get shared groups
        const sharedRes = await Groups.getAllGroupsByNoteId(this.props.note.id);
        if (!sharedRes.ok) {
            this.setState({ loading: false, error: sharedRes.message });
            return;
        }

        this.setState({ loading: false, allGroups: res.result, groups: sharedRes.result, studId: studRes.stud.id });
    }
    toggleContent = () => this.setState({ contentOpen: !this.state.contentOpen });
    toggleCollapse = () => this.setState({ open: !this.state.open });

    isChecked = (index) => {
        return this.state.groups.map(x => x.id).includes(this.state.allGroups[index].id);
    }
    handleCheck = (event, index) => {
        if (event.target.checked) {
            this.setState({ groups: [...this.state.groups, this.state.allGroups[index]] });
        } else {
            this.setState({ groups: this.state.groups.filter(x => x.id !== this.state.allGroups[index].id) });
        }
    }

    // Save changes
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });

        const resR = await GroupNotes.removeNoteFromAllGroups(this.props.note.id);
        if (!resR.ok) {
            this.setState({ error: resR.message });
        }

        for (let i = 0; i < this.state.groups.length; i++) {
            const share = this.state.groups[i];

            const res = await GroupNotes.addNoteToGroup(this.props.note.id, share.id);
            if (!res.ok) {
                this.setState({ error: res.message });
            }
        }
        this.setState({ loading: false });

        if (this.props.onSaveFinished)
            this.props.onSaveFinished(this.state.groups);
    };

    // Html
    dateToDMY = (isoDate) => {
        const date = new Date(isoDate)

        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();

        let h = date.getHours();
        let mi = date.getMinutes();

        return [
            (d < 10 ? '0' + d : d) + '-' + (m < 10 ? '0' + m : m) + '-' + y,
            (h < 10 ? '0' + h : h) + ':' + (mi < 10 ? '0' + mi : mi)
        ];
    }
    render() {
        const noteDateTime = this.dateToDMY(this.props.note.createdAt);
        return (
            <div className="ShareEditor">
                <Form className="course-form" onSubmit={this.handleSubmit}>
                    {this.props.error ?
                        <Form.Group controlId="formBasicError">
                            <Alert style={{ margin: 0 }} variant='danger'>{this.props.error}</Alert>
                        </Form.Group>
                        : <></>
                    }
                    <Form.Group controlId="formBasic">
                        <Form.Label className="label-curs">Note</Form.Label> <br />

                        <Card size="sm">
                            <Card.Header onClick={this.toggleContent}>
                                <Button variant="link" size="sm" disabled>{this.props.note.title}</Button>

                                <Button className="button-right" variant="link" size="sm" disabled>
                                    <span className="nr-of-shares">{this.state.groups.length}</span>
                                    <Share color="#4287F5" />
                                </Button>
                                <span className="note-date">{noteDateTime[0]}<br />{noteDateTime[1]}</span>
                            </Card.Header>
                            <Collapse in={this.state.contentOpen}>
                                <Card.Body>
                                    {this.props.note.content}
                                </Card.Body>
                            </Collapse>
                        </Card>
                    </Form.Group>

                    <Form.Group controlId="formBasicNotes">
                        <Form.Label className="label-curs">Groups</Form.Label>
                        <Card size="sm">
                            <Card.Header onClick={this.toggleCollapse}>
                                <Button variant="link" size="sm" onClick={this.toggleCollapse}>
                                    {this.state.open ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                                </Button>
                            </Card.Header>
                            <Collapse in={this.state.open}>
                                <Card.Body>
                                    <ListGroup variant="flush" size="sm">
                                        {this.state.allGroups.map((group, index) =>
                                            <ListGroup.Item key={index}>
                                                <span>{group.name}</span>

                                                <Form.Switch id={"switch-" + index}
                                                    style={{ float: "right" }}
                                                    checked={this.isChecked(index)}
                                                    onChange={event => this.handleCheck(event, index)}
                                                    label="Share" />
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
export default ShareEditor;
