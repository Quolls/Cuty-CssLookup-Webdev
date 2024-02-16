import React from 'react'
import { Row, Col, Modal, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorToast } from '../../Component/Toaster/Toaster';
import { ApiPost } from '../../helpers/API/API_data';
const CustomerSupport = ({isCostpmerSupportOpen, setIsCostpmerSupportOpen=()=>{}}) => {

  // yup schema for customer support form
  const customerSupportSchema = yup.object().shape({
    userName: yup.string().required("Name is required "),
    email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
    query: yup.string().required("Query is required"),
   
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSupportSchema),
  });

// handle submit
  const submitdata = (data) => {
    const body = {
      userName: data?.userName,
      email: data?.email,
      query:data?.query, //patient status 0
      status:0 
    };

    ApiPost("patient/customer_support", body)
    .then(async(res)=>{
      if(res.status === 200 ) {
        setIsCostpmerSupportOpen(false)
      }
      return res;
    })
    .catch((e) => {
      ErrorToast(e?.message);
    });
  };

  return (
    <Modal
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    className="regular_doctor_modal"
    centered
    show={isCostpmerSupportOpen}
    onHide={() => {
        setIsCostpmerSupportOpen(false);
    }}
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       Customer Support
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="medicinlist doctor_mediation">
        {/* form to submit customer support detail */}
        <Form>
          <Row>
            <Col lg={6} style={{height:"108px"}}>
              <div className="medicininput">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="userName"
                  autoComplete="off"
                  {...register("userName")}
                />
                {errors?.userName && (
                  <p style={{ color: "red" }}>
                    {errors?.userName?.message}
                  </p>
                )}
              </div>
            </Col>
            <Col lg={6} style={{height:"108px"}}>
              <div className="medicininput">
                <span>Email</span>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  autoComplete="off"
                  {...register("email")}
                />
                {errors?.email && (
                  <p style={{ color: "red" }}>
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            </Col>
            <Col lg={12} style={{height:"140px"}}>
              <div className="medicininput">
                <span>Query</span>
                <textarea
                  rows="2"
                  type="text"
                  placeholder="Enter Your Query"
                  name="query"
                  autoComplete="off"
                  {...register("query")}
                />
                {errors?.query && (
                  <p style={{ color: "red" }}>{errors?.query?.message}</p>
                )}
              </div>
            </Col>
            <div className="btnredsubmit">
              <Link
                to=""
                className="btnred"
                onClick={handleSubmit((data) => {
                  submitdata(data);
                })}
              >
                Submit
              </Link>
            </div>
          </Row>
        </Form>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default CustomerSupport