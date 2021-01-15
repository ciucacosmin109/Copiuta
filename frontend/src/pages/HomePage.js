import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons'

import CourseList from '../components/CourseList';
import CourseEditor from "../components/CourseEditor";

import Courses from "../data/Courses";
import Login from '../data/Login';

import './HomePage.css'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studId: "0",

            error: null,
            loading: true,

            modal: false,
            modalLoading: false,
            modalError: null
        }
        this.CourseList = React.createRef();
    }
    async componentDidMount() {
        const studRes = await Login.getCurrentLoggedIn();
        if (!studRes.ok) {
            this.setState({ loading: false, error: "Login: " + studRes.message });
            return;
        }

        this.setState({ loading: false, error: null, studId: studRes.stud.id });
    }

    // Modal
    showModal = () => this.setState({ modal: true });
    hideModal = () => this.setState({ modal: false });

    modalSave = async c => {
        this.setState({ modalLoading: true, modalError: null });

        if (this.state.studId !== "0") {
            // Do an insert 
            const res = await Courses.addCourse(this.state.studId, c);
            if (!res.ok) {
                this.setState({ modalError: res.message, modalLoading: false });
            } else {
                this.setState({ modal: false, modalError: null, modalLoading: false });
                if (this.CourseList) {
                    this.CourseList.current.fetchCourses();
                }
            }
        } else this.setState({ modalError: "Invalid student", modalLoading: false });
    }

    render() {
        return (
            <div className="HomePage flex-grid">
                <Card className="flex-col">
                    <Card.Header>
                        <div className="card-title">Courses</div>

                        <Button className="button-right" variant="link" size="sm" onClick={this.showModal}><PlusSquare color="gray" /></Button>
                    </Card.Header>
                    <Card.Body>
                        {this.state.studId !== "0" ? <CourseList ref={this.CourseList} studId={this.state.studId} /> : "No courses"}
                    </Card.Body>
                </Card>

                <Modal show={this.state.modal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CourseEditor
                            editable={true}
                            onSaveClicked={this.modalSave}

                            error={this.state.modalError}
                            loading={this.state.modalLoading}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default HomePage;