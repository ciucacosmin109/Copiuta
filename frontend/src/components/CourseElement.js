import React from 'react';
import { withRouter } from 'react-router-dom'

import NoteList from './NoteList';
import CourseEditor from './CourseEditor';

import { Button, Card, Collapse, Modal } from 'react-bootstrap';
import { PencilSquare, Trash, CaretDown, CaretUp, PlusSquare } from 'react-bootstrap-icons';

import './CourseElement.css';
import Courses from '../data/Courses';

class CourseElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,

            modal: false,
            modalEdit: false,
            modalLoading: true,
            modalError: null
        };

    }

    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    }
    showModal = editEnabled => {
        this.setState({ modal: true, modalEdit: editEnabled });
    }
    hideModal = () => {
        this.setState({ modal: false });
    }

    // Course
    viewCourse = () => this.showModal(false);
    editCourse = () => this.showModal(true);
    addNoteToCourse = () => {
        this.props.history.push("note/add/" + this.props.course.id);
    }

    // Modal
    modalSave = async c => {
        if (c && c.id) {
            // Do an update 
            const res = await Courses.updateCourse(c.id, c);
            if (!res.ok) {
                this.setState({ modalError: res.message, modalLoading: false });
            } else this.setState({ modal: false });
        } else this.setState({ modal: false });

        if (this.props.onUpdate)
            this.props.onUpdate();
    }
    modalFetched = res => {
        if (!res.ok) {
            this.setState({ modalLoading: false, modalError: res.message });
        } else {
            this.setState({ modalLoading: false, modalError: null });
        }
    }

    // Html
    render() {
        return (<>
            <Card className="CourseElement" size="sm">
                <Card.Header>
                    <Button variant="link" size="sm" onClick={this.viewCourse}>{this.props.course.name}</Button>
                    {this.props.showNotes ?
                        <Button variant="link" size="sm" onClick={this.toggleCollapse}>
                            {this.state.open ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                        </Button> : <></>
                    }

                    {this.props.onDelete ?
                        <Button className="button-right" variant="link" size="sm" onClick={this.props.onDelete}><Trash color="gray" /></Button> : <></>
                    }
                    <Button className="button-right" variant="link" size="sm" onClick={this.editCourse}><PencilSquare color="gray" /></Button>
                    <Button className="button-right" variant="link" size="sm" onClick={this.addNoteToCourse}><PlusSquare color="gray" /></Button>
                </Card.Header>
                {this.props.showNotes ?
                    <Collapse in={this.state.open}>
                        <Card.Body>
                            <NoteList courseId={this.props.course.id} />
                        </Card.Body>
                    </Collapse> : <></>
                }
            </Card>

            <Modal show={this.state.modal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modalEdit ? "Edit course" : "View course"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CourseEditor
                        editable={this.state.modalEdit}
                        courseId={this.props.course.id}

                        onSaveClicked={this.modalSave}
                        onCourseFetched={this.modalFetched}

                        error={this.state.modalError}
                        loading={this.state.modalLoading}
                    />
                </Modal.Body>
            </Modal>
        </>);
    }
}

export default withRouter(CourseElement); 