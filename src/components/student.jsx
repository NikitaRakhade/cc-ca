import axios from 'axios';
import { useEffect, useState } from "react";
import './student.scss'; 


function Student() {
    const [studentid, setId] = useState('');
    const [studentname, setName] = useState("");
    const [studentaddress, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [students, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("http://localhost:8081/api/v1/student/getAll");
        setUsers(result.data);
        console.log(result.data);
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8081/api/v1/student/save", {
                studentname: studentname,
                studentaddress: studentaddress,
                mobile: mobile
            });
            alert("Student Registration Successfully");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            Load();
        } catch (err) {
            alert("User Registration Failed");
        }
    }

    async function editStudent(student) {
        setName(student.studentname);
        setAddress(student.studentaddress);
        setMobile(student.mobile);
        setId(student._id);
    }

    async function DeleteStudent(studentid) {
        await axios.delete("http://localhost:8081/api/v1/student/delete/" + studentid);
        alert("Student deleted Successfully");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.put("http://localhost:8081/api/v1/student/edit/" + studentid, {
                studentname: studentname,
                studentaddress: studentaddress,
                mobile: mobile
            });
            alert("Student Registration Updated");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            Load();
        } catch (err) {
            alert("Student Update Failed");
        }
    }

    return (
        <div>
            <h1>Cloud Computing CA 2 Activity</h1>
            <h2>student Details</h2>
            <div className="container mt-4">
                <form>
                    <div className="form-group">
                        <label>Student Name</label>
                        <input type="text" className="form-control" id="studentname" value={studentname}
                            onChange={(event) => { setName(event.target.value); }} />
                    </div>

                    <div className="form-group">
                        <label>Student Address</label>
                        <input type="text" className="form-control" id="studentaddress" value={studentaddress}
                            onChange={(event) => { setAddress(event.target.value); }} />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input type="text" className="form-control" id="mobile" value={mobile}
                            onChange={(event) => { setMobile(event.target.value); }} />
                    </div>

                    <div>
                        <button className="btn btn-primary mt-4" onClick={save}>Register</button>
                        <button className="btn btn-warning mt-4" onClick={update}>Update</button>
                    </div>
                </form>
            </div>

            <table className="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Student Address</th>
                        <th scope="col">Student Mobile</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.studentname}</td>
                            <td>{student.studentaddress}</td>
                            <td>{student.mobile}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => editStudent(student)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Student;
