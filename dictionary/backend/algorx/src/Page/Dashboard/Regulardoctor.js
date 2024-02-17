import React from "react";
import { useState } from "react";
import { Form, Modal, Row } from "react-bootstrap";
import { Col } from "reactstrap";
import edit from "../../Assets/edit.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ApiPut } from "../../helpers/API/API_data";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";

// regular doctor detail
function Regulardoctor({ regularDoctor, getPatientdata }) {
  const [modal, setModal] = useState(false);

  // schema to update regular doctor
  const signupSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required "),
    lastName: yup.string().required("Last Name is required"),
    clinicName: yup.string().required("clinic Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    reset(regularDoctor);
  }, [regularDoctor]);

  // submit regular updated doctor
  const submitdata = (data) => {
    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      clinicName: data?.clinicName,
      email: data?.email,
    };
    ApiPut(`patient/regularDoctor`, body)
      .then((res) => {
        getPatientdata();
        setModal(false);
        reset({
          firstName: "",
          lastName: "",
          clinicName: "",
          email: "",
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div className="mytreatmentd bg-white border border-neutral-300 rounded-lg">
        <div className="mytreatmentheading bg-white rounded-t-lg">
          <h4>Regular Doctor</h4>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "#18181B" }}
            onClick={() => setModal(true)}
          />
        </div>

        {/* regular doctor info */}
        <div className="Regular-flids">
          <Row style={{ rowGap: "20px" }}>
            <Col lg={4}>
              <span className='text-[#18181E]'>First Name</span>
              <p className="mb-0">
                {regularDoctor?.firstName ? regularDoctor?.firstName : "-"}
              </p>
            </Col>
            <Col lg={4}>
              <span className='text-[#18181E]'>Last Name</span>
              <p className="mb-0">
                {regularDoctor?.lastName ? regularDoctor?.lastName : "-"}
              </p>
            </Col>
            <Col lg={4}>
              <span>Clinic Name</span>
              <p className="mb-0">
                {regularDoctor?.clinicName ? regularDoctor?.clinicName : "-"}
              </p>
            </Col>
            <Col lg={6}>
              <span className='text-[#18181E]'>Email</span>
              <p className="mb-0">
                {regularDoctor?.email ? regularDoctor?.email : "-"}
              </p>
            </Col>
          </Row>
        </div>
      </div>
      {/* modal to update reguar doctor */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="regular_doctor_modal"
        centered
        show={modal}
        onHide={() => {
          setModal(false);
          reset({
            firstName: "",
            lastName: "",
            clinicName: "",
            email: "",
          });
          getPatientdata();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Regular Doctor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="medicinlist doctor_mediation">
            <Form>
              <Row>
                <Col lg={6}>
                  <div className="medicininput">
                    <span>First Name</span>
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      name="firstName"
                      autoComplete="off"
                      {...register("firstName")}
                    />
                    {errors?.firstName && (
                      <p style={{ color: "red" }}>
                        {errors?.firstName?.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="medicininput">
                    <span>Last Name</span>
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      name="lastName"
                      autoComplete="off"
                      {...register("lastName")}
                    />
                    {errors?.lastName && (
                      <p style={{ color: "red" }}>
                        {errors?.lastName?.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="medicininput">
                    <span>Email</span>
                    <input
                      type="text"
                      placeholder="Enter Your Email "
                      name="email"
                      autoComplete="off"
                      {...register("email")}
                    />
                    {errors?.email && (
                      <p style={{ color: "red" }}>{errors?.email?.message}</p>
                    )}
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="medicininput">
                    <span>Clinic Name</span>
                    <input
                      type="text"
                      placeholder="Enter Your Clinic Name"
                      name="clinicName"
                      autoComplete="off"
                      {...register("clinicName")}
                    />
                    {errors?.clinicName && (
                      <p style={{ color: "red" }}>
                        {errors?.clinicName?.message}
                      </p>
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
    </>
  );
}

export default Regulardoctor;
