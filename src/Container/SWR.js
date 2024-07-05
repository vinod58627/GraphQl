// import React from 'react';
// import useSWR from 'swr';

// // Define the fetcher function
// const fetcher = (url) => fetch(url).then((res) => res.json());

// const SWR = () => {
//   // Use SWR to fetch data from an API
//   const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

//   if (error) return <div>Error loading data</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {data.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SWR;



// import useSWR, { mutate } from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const SWR = () => {
//   const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

//   const addPost = async () => {
//     const newPost = { title: 'New Post' };
//     mutate('https://jsonplaceholder.typicode.com/posts', [...data, newPost], false);
//     await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       body: JSON.stringify(newPost),
//     });
//     mutate('https://jsonplaceholder.typicode.com/posts');
//   };

//   if (error) return <div>Error loading data</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Posts</h1>
//       <button onClick={addPost}>Add Post</button>
//       <ul>
//         {data.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default SWR;


import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import * as HERBUI from "react-bootstrap";
import * as Yup from 'yup';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import Select from 'react-select'
import axios from 'axios';
import { SAVE_STUDENT, GET_STUDENT, GET_STUDENTS, EDIT_STUDENT, DELETE_STUDENT } from '../API\'s/URLS';
import Swal from "sweetalert2";
// import DataTable from './../CommonService/DataTable'
import { appendSerialNo } from '../CommonService/AppendingSerialNumber';

const fetcher = (url) => fetch(url).then((res) => res.json());

const FormPost = () => {
    const { data, error } = useSWR(GET_STUDENTS, fetcher);
    // const [data, setData] = useState([])


    const formik = useFormik({
        initialValues: {
            sno: '',
            headId: '',
            headDesc: '',
            level2Desc: '',
            level3Desc: '',
            level4Desc: '',
            level5Desc: '',
            level6Desc: '',
        },
        validationSchema: Yup.object({
            headId: Yup.string().required("Required"),
            headDesc: Yup.string().required("Required"),
            level2Desc: Yup.string().required("Required"),
            level3Desc: Yup.string().required("Required"),
            level4Desc: Yup.string().required("Required"),
            level5Desc: Yup.string().required("Required"),
            level6Desc: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            let params = {
                name: values.headId,
                username: values.headDesc,
                email: values.level2Desc,
                rollno: parseInt(values.level3Desc),
                phone: values.level4Desc,
                age: values.level5Desc,
                location: values.level6Desc,
            }
            if (values.sno) {
                axios({
                    method: 'put',
                    url: EDIT_STUDENT + values.sno,
                    data: params
                }).then(res => {
                    if (res) {
                        console.log("sad", res)
                        Swal.fire({
                            text: res.data,
                            icon: "success"
                        }).then(function () {
                            formik.resetForm();
                            mutate(GET_STUDENTS);
                        })
                    }
                }).catch(res => {
                    Swal.fire({
                        text: res.response?.data?.error,
                        icon: "error"
                    })
                })
            } else {
                axios({
                    method: 'post',
                    url: SAVE_STUDENT,
                    data: params
                }).then(res => {
                    if (res) {
                        console.log("sad", res)
                        Swal.fire({
                            text: res.data,
                            icon: "success"
                        }).then(function () {
                            formik.resetForm();
                            mutate(GET_STUDENTS);
                        })
                    }
                }).catch(res => {
                    Swal.fire({
                        text: res.response?.data?.error,
                        icon: "error"
                    })
                })
            }
        }
    })
    // const Getdata = () => {
    //     axios.get(GET_STUDENTS).then(res => {
    //         if (res) {
    //             setData(res.data)
    //         }
    //     })
    // }
    useEffect(() => {
        // Getdata()

        axios.get(GET_STUDENT + '6869').then(res => {
            if (res) {
                console.log("stu", res.data)
            }
        })
    }, [])
    const columns = [
        {
            dataField: 'sno',
            text: 'SL.NO',
            sort: true,
        },
        {
            dataField: 'headId',
            text: 'HOA ID',
            sort: true,
            style: {
                textAlign: 'end'
            }
        },
        {
            dataField: 'headDesc',
            text: 'HOA DESCRIPTION',
            sort: true,
        },
        {
            dataField: 'level2Desc',
            text: 'LEVEL 2 DESCRIPTION',
            sort: true
        },
        {
            dataField: "level3Desc",
            text: "LEVEL 3 DESCRIPTION",
            sort: true
        },
        {
            dataField: "level4Desc",
            text: "LEVEL 4 DESCRIPTION",
            sort: true
        },
        {
            dataField: "level5Desc",
            text: "LEVEL 5 DESCRIPTION",
            sort: true
        }
    ]

    //   const [datatableDetails, setDatatableDetails] = useState(
    //     {
    //       headers: columns,
    //       body: [],
    //       keyField: 'sno'
    //     })
    //   useEffect(() => {
    //     setDatatableDetails(prevState => ({
    //       ...prevState,
    //       body: appendSerialNo(data)
    //     }));
    //   }, [data]);
    // console.log(data)
    const UpdateFuntion = (item) => {
        formik.setFieldValue("sno", item.id)
        formik.setFieldValue("headId", item.name)
        formik.setFieldValue("headDesc", item.username)
        formik.setFieldValue("level2Desc", item.email)
        formik.setFieldValue("level3Desc", item.roll_no)
        formik.setFieldValue("level4Desc", item.phone)
        formik.setFieldValue("level5Desc", item.age)
        formik.setFieldValue("level6Desc", item.location)
    }
    const DeleteFuntion = (item) => {
        axios.delete(DELETE_STUDENT + item.id).then(res => {
            if (res) {
                Swal.fire({
                    text: res.data,
                    icon: "success"
                }).then(function () {
                    formik.resetForm();
                    mutate(GET_STUDENTS);
                })
            }
        }).catch(res => {
            Swal.fire({
                text: res.response?.data?.error,
                icon: "error"
            })
        })
    }
    return (<><FormikProvider value={formik}>
        <br /><br />
        <HERBUI.Container>
            <form onSubmit={formik.handleSubmit}>
                <HERBUI.Row className="my-1">
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style"><span className="mandatory" >*</span>Name :</span>
                            <Field type="text" className="form-control" name="headId" autoComplete="off" />
                            <ErrorMessage className="text-error" name="headId" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                </HERBUI.Row>
                <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style"><span className="mandatory" >*</span>User Name :</span>
                            <Field type="text" className="form-control" name="headDesc" autoComplete="off" />
                            <ErrorMessage className="text-error" name="headDesc" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style">Email :</span>
                            <Field type="text" className="form-control" name="level2Desc" autoComplete="off" />
                            <ErrorMessage className="text-error" name="level2Desc" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style">Roll No :</span>
                            <Field type="text" className="form-control" name="level3Desc" autoComplete="off" />
                            <ErrorMessage className="text-error" name="level3Desc" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                </HERBUI.Row>
                <HERBUI.Row>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style">Phone :</span>
                            <Field type="text" className="form-control" name="level4Desc" autoComplete="off" />
                            <ErrorMessage className="text-error" name="level4Desc" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style">Age :</span>
                            <Field type="text" className="form-control" name="level5Desc" autoComplete="off" />
                            <ErrorMessage className="text-error" name="level5Desc" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                    <HERBUI.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <HERBUI.InputGroup className="mb-4p5">
                            <span className="label-text-style">Location :</span>
                            <Field type="text" className="form-control" name="level6Desc" autoComplete="off" />
                            <ErrorMessage className="text-error" name="level6Desc" component="div" />
                        </HERBUI.InputGroup>
                    </HERBUI.Col>
                </HERBUI.Row>
                <HERBUI.Button className="btnSave btn btn-success" type="submit"><b>SUBMIT</b></HERBUI.Button>
            </form>
        </HERBUI.Container>

        <HERBUI.Container>
            {/* {<DataTable plotData={datatableDetails} />} */}
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Location</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((res, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{res.name}</td>
                                <td>{res.username}</td>
                                <td>{res.email}</td>
                                <td>{res.roll_no}</td>
                                <td>{res.phone}</td>
                                <td>{res.age}</td>
                                <td>{res.location}</td>
                                <td><button type="button" className="btn btn-warning" onClick={() => UpdateFuntion(res)}>Update</button><button type="button" className='btn btn-danger' onClick={() => DeleteFuntion(res)}>Delete</button></td>
                            </tr>)
                        })
                    }

                </tbody>

            </table>
        </HERBUI.Container>

    </FormikProvider>
    </>)
}

export default FormPost;
