import React from 'react';
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

    }
    async componentDidMount() {
        await this.fetchCourses();
    }
    fetchCourses = async () => {
        console.log("fetching")
        const coursesRes = await Courses.getAllCoursesByStudentId(this.props.studId);
        if (!coursesRes.ok) {
            this.setState({ loading: false, error: "Courses: " + coursesRes.message });
            return;
        }

        this.setState({
            courses: coursesRes.result,

            loading: false,
            error: null
        })
    }

    deleteNote = async index => {
        const result = await Courses.deleteCourse(this.state.courses[index].id);
        if (result.ok) {
            this.setState({ courses: this.state.courses.filter((_, i) => i !== index) });
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
                        onUpdate={this.fetchCourses}
                        onDelete={() => this.deleteNote(index)}
                    />
                )}

            </div>
        );
    }
}

export default CourseList; 