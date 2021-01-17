import { EventEmitter } from 'fbemitter';
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

        this.emitter = new EventEmitter();

        this.props.emitter.addListener('UPDATE', () => {
            this.fetchCourses();
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

        this.emitter.emit("UPDATE");

        if (this.props.onUpdated)
            this.props.onUpdated();
    }

    deleteCourse = async index => {
        const result = await Courses.deleteCourse(this.state.courses[index].id);
        if (result.ok) {
            this.setState({ courses: this.state.courses.filter((_, i) => i !== index) });

            if (this.props.onUpdated)
                this.props.onUpdated();
        } else {
            this.setState({ error: result.message });
        }

        this.props.emitter.emit('UPDATE');
    }

    render() {
        return (
            <div className="CourseList">
                {this.state.courses.length === 0 ? "No courses" : <></>}
                {this.state.courses.map((elem, index) =>
                    <CourseElement key={index}
                        course={elem}
                        showNotes
                        emitter={this.emitter}
                        onUpdated={this.fetchCourses}
                        onDelete={() => this.deleteCourse(index)}
                    />
                )}

            </div>
        );
    }
}

export default withRouter(CourseList); 