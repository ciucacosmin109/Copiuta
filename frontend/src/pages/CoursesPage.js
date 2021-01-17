import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons'

import CourseList from '../components/CourseList';
import CourseEditor from "../components/CourseEditor";

import Courses from "../data/Courses";
import Login from '../data/Login';

import './CoursesPage.css'
import { EventEmitter } from 'fbemitter';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studId: "0",

            error: null,
            loading: true,

            courseModal: false,
            courseModalLoading: false,
            courseModalError: null,
        }
        this.emitter = new EventEmitter();
    }
    async componentDidMount() {
        const studRes = await Login.getCurrentLoggedIn();
        if (!studRes.ok) {
            this.setState({ loading: false, error: "Login: " + studRes.message });
            return;
        }

        this.setState({ loading: false, error: null, studId: studRes.stud.id });
    }

    // Updates
    courseListUpdated = () => {
        //... 
        this.forceUpdate()
    }

    // Course Modal
    showCourseModal = () => this.setState({ courseModal: true });
    hideCourseModal = () => this.setState({ courseModal: false });
    courseModalSave = async c => {
        if (!c) {
            this.setState({ courseModal: false, courseModalError: null, courseModalLoading: false });
            return;
        }
        this.setState({ courseModalLoading: true, courseModalError: null });

        if (this.state.studId !== "0") {
            // Do an insert 
            const res = await Courses.addCourse(this.state.studId, c);
            if (!res.ok) {
                this.setState({ courseModalError: res.message, courseModalLoading: false });
            } else {
                this.setState({ courseModal: false, courseModalError: null, courseModalLoading: false });

                this.emitter.emit('UPDATE');
            }
        } else this.setState({ courseModalError: "Invalid student", courseModalLoading: false });
    }

    // Html
    render() {
        return (
            <div className="CoursesPage flex-grid">
                <Card className="flex-col">
                    <Card.Header>
                        <div className="card-title">Courses</div>

                        <Button className="button-right" variant="link" size="sm" onClick={this.showCourseModal}><PlusSquare color="green" /></Button>
                    </Card.Header>
                    <Card.Body>
                        {this.state.studId !== "0" ?
                            <CourseList
                                emitter={this.emitter}
                                studId={this.state.studId}
                                onUpdated={this.courseListUpdated}
                            /> : "No courses"
                        }
                    </Card.Body>
                </Card>

                <Modal show={this.state.courseModal} onHide={this.hideCourseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CourseEditor
                            editable={true}
                            onSaveClicked={c => this.courseModalSave(c)}

                            error={this.state.courseModalError}
                            loading={this.state.courseModalLoading}
                        />
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default CoursesPage;