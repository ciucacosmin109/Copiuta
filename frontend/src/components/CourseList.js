import React from 'react';
import { withRouter } from "react-router-dom";
import Courses from '../data/Courses';

import CourseElement from "./CourseElement"

import './CourseList.css';

class CourseList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],

            loading: true,
            error: null,

        };

        this.props.emitter.addListener('UPDATE', () => {
            this.fetchCourses()
        })
    }
    async componentDidMount() {
        await this.fetchCourses();
    }
    fetchCourses = async () => {
        const coursesRes = await Courses.getAllCoursesByStudentId(this.props.studId);
        if (!coursesRes.ok) {
            this.setState({ loading: false, error: "Courses: " + coursesRes.message });
            return;
        }

        this.setState({
            courses: coursesRes.result,

            loading: false,
            error: null
        });

        if (this.props.onUpdated)
            this.props.onUpdated();
    }

    deleteNote = async index => {
        const result = await Courses.deleteCourse(this.state.courses[index].id);
        if (result.ok) {
            this.setState({ courses: this.state.courses.filter((_, i) => i !== index) });

            if (this.props.onUpdated)
                this.props.onUpdated();
        } else {
            this.setState({ error: result.message });
        }
    }

    render() {
        return (
            <div className="CourseList">
                {this.state.courses.length === 0 ? "No courses" : <></>}
                {this.state.courses.map((elem, index) =>
                    <CourseElement key={index}
                        course={elem}
                        showNotes
                        onUpdated={this.fetchCourses}
                        onDelete={() => this.deleteNote(index)}
                    />
                )}

            </div>
        );
    }
}

export default withRouter(CourseList); 