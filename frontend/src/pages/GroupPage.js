import React from 'react';
import { EventEmitter } from 'fbemitter';
import { Alert, Button, Card, Collapse, Form, Modal } from 'react-bootstrap';
import { CaretDown, CaretUp, PersonPlus, DoorOpen } from 'react-bootstrap-icons'
import NoteList from '../components/NoteList';
import StudentList from '../components/StudentList';
import GroupMembersEditor from '../components/GroupMembersEditor'

import Groups from '../data/Groups';
import Notes from '../data/Notes';
import Students from '../data/Students';

import './GroupPage.css'
import Login from '../data/Login';
import GroupStudents from '../data/GroupStudents';

class GroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",

            notes: [],
            students: [],

            currentStudId: "0",
            isAdmin: false,

            error: null,
            loading: true,

            notesOpen: true,
            studOpen: true,

            modal: false,
        };

        this.emitter = new EventEmitter()
    }
    async componentDidMount() {
        await this.fetchGroup();
    }
    fetchGroup = async () => {
        const { params } = this.props.match;

        // Get group info
        const gr = await Groups.getGroup(params.id);
        if (!gr.ok) {
            this.setState({ loading: false, error: "Group: " + gr.message });
            return;
        }

        // Get notes
        const nr = await Notes.getAllNotesByGroupId(params.id);
        if (!nr.ok) {
            this.setState({ loading: false, error: "Notes: " + nr.message });
            return;
        }

        // Get student list
        const sr = await Students.getAllStudentsByGroupId(params.id);
        if (!sr.ok) {
            this.setState({ loading: false, error: "Stud: " + sr.message });
            return;
        }

        // Check if the user is admin
        const lr = await Login.getCurrentLoggedIn();
        if (!lr.ok) {
            this.setState({ loading: false, error: "Admin: " + lr.message });
        }
        let adm = false;
        let member = sr.result.find(x => x.id === lr.stud.id);
        if (!member) {
            // Daca nu e mambru du-l la grupuri
            this.props.history.push('/groups');
            return;
        }
        if (member.isAdmin) {
            adm = true;
        }

        this.setState({
            name: gr.result.name,
            description: gr.result.description,

            notes: nr.result,
            students: sr.result,

            currentStudId: lr.stud.id,
            isAdmin: adm,

            loading: false,
            error: null,
        });
    }

    toggleNotesCollapse = () => {
        this.setState({ notesOpen: !this.state.notesOpen });
    }
    toggleStudCollapse = () => {
        this.setState({ studOpen: !this.state.studOpen });
    }

    // Modal 
    showModal = () => {
        this.setState({ modal: true });
    }
    hideModal = () => {
        this.setState({ modal: false });
    }
    // Modal
    modalSaved = async students => {
        this.hideModal();

        this.emitter.emit('UPDATE');

        if (this.props.onUpdated)
            this.props.onUpdated();
    }
    studentListUpdated = () => {
        this.forceUpdate()
    }

    // hmmm
    addStudent = () => {
        this.showModal();
    }
    removeStudentFromGroup = async () => {
        const { params } = this.props.match;

        const res = await GroupStudents.removeStudentFromGroup(this.state.currentStudId, params.id);
        if (!res.ok) {
            this.setState({ loading: false, error: "Gr-rem: " + res.message });
            return;
        }
        this.props.history.push('/groups');
    }

    // Html
    render() {
        const { params } = this.props.match;
        return (
            <div className="GroupPage flex-grid">
                <Card className="flex-col">
                    <Card.Header>
                        <div className="card-title">{this.state.name}</div>

                        {!this.state.isAdmin ?
                            <Button className="button-right" variant="link" size="sm" onClick={this.removeStudentFromGroup}>
                                <DoorOpen color="#F54242" />
                            </Button> : <></>
                        }
                    </Card.Header>
                    <Card.Body>
                        {this.props.error ?
                            <Alert style={{ margin: 0 }} variant='danger'>{this.props.error}</Alert>
                            : <></>
                        }

                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            as="textarea"
                            value={this.state.description}
                            readOnly

                            type="text"
                            disabled={this.props.loading ? true : false}
                        /><br />

                        <Form.Label>Notes</Form.Label>
                        <Card size="sm">
                            <Card.Header className="card-header-sm" onClick={this.toggleNotesCollapse}>
                                <Button variant="link" size="sm" onClick={this.toggleNotesCollapse}>
                                    {this.state.notesOpen ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                                </Button>
                            </Card.Header>
                            <Collapse in={this.state.notesOpen}>
                                <Card.Body className="card-body-sm">
                                    <NoteList
                                        groupId={params.id}
                                        shared
                                    />
                                </Card.Body>
                            </Collapse>
                        </Card><br />

                        {this.state.isAdmin ? <>
                            <Form.Label>Students</Form.Label>
                            <Card size="sm">
                                <Card.Header className="card-header-sm">
                                    <Button variant="link" size="sm" onClick={this.toggleStudCollapse}>
                                        {this.state.studOpen ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                                    </Button>
                                    <Button className="button-right" variant="link" size="sm" onClick={this.addStudent}>
                                        <PersonPlus color="green" />
                                    </Button>
                                </Card.Header>
                                <Collapse in={this.state.studOpen}>
                                    <Card.Body className="card-body-sm">
                                        <StudentList
                                            emitter={this.emitter}
                                            groupId={params.id}
                                            onUpdated={this.studentListUpdated}
                                        />
                                    </Card.Body>
                                </Collapse>
                            </Card> </> : <></>
                        }

                        <Modal show={this.state.modal} onHide={this.hideModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Members</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <GroupMembersEditor
                                    groupId={params.id}
                                    onSaveFinished={e => this.modalSaved(e)}
                                />
                            </Modal.Body>
                        </Modal>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default GroupPage;