import React from 'react';
import { withRouter } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';

import Students from '../data/Students';
import GroupStudents from '../data/GroupStudents';
import StudentElement from './StudentElement';

class StudentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],

            loading: true,
            error: null
        };

        this.props.emitter.addListener('UPDATE', () => {
            this.fetchStudentsByGroupId()
        })
    }
    async componentDidMount() {
        if (!this.props.groupId) this.fetchStudents();
        else await this.fetchStudentsByGroupId()
    }
    fetchStudents = async () => {
        const sRes = await Students.getAllStudents();

        if (!sRes.ok) {
            this.setState({ loading: false, error: "Studs: " + sRes.message });
            return;
        }

        this.setState({
            loading: false,
            error: null,

            students: sRes.result
        })
    }
    fetchStudentsByGroupId = async () => {
        const sRes = await Students.getAllStudentsByGroupId(this.props.groupId);

        if (!sRes.ok) {
            this.setState({ loading: false, error: "Studs: " + sRes.message });
            return;
        }

        this.setState({
            loading: false,
            error: null,

            students: sRes.result
        });

        if (this.props.onUpdated)
            this.props.onUpdated();
    }

    // Students
    deleteStudent = async index => {
        const result = await GroupStudents.removeStudentFromGroup(this.state.students[index].id, this.props.groupId);
        if (result.ok) {
            this.setState({ students: this.state.students.filter((_, i) => i !== index) });

            if (this.props.onUpdated)
                this.props.onUpdated();
        } else {
            this.setState({ error: result.message });
        }
    }

    // Html
    render() {
        return (
            <ListGroup variant="flush" size="sm">
                {this.state.students.map((elem, index) =>
                    <ListGroup.Item key={index}>
                        {this.props.groupId ?
                            <StudentElement
                                student={elem}
                                readOnly={elem.isAdmin}
                                onDelete={() => this.deleteStudent(index)}
                            />
                            :
                            <StudentElement
                                student={elem}
                            />
                        }
                    </ListGroup.Item>
                )}
            </ListGroup>
        );
    }
}

export default withRouter(StudentList); 