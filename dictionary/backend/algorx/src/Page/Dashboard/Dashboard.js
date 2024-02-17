import "./Dashboard.css";
import React, { useEffect, useState } from "react";
// import edit from "../../Assets/edit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/pro-regular-svg-icons";
import { ApiGet, ApiPut } from "../../helpers/API/API_data";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Prescription from "./Prescription";
import Document from "./Document";
import ChatHistory from "./ChatHistory";
import MyTreatment from "./MyTreatment";
import SideDrawer from "../SideDrawer/SideDrawer";
import moment from "moment";
import Regulardoctor from "./Regulardoctor";
import Header from "../Header/Header";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";
import { AiOutlineEdit } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PaymentAdress from "../../Component/Payment/PaymentAdress";
const Dashboard = () => {
  const [userData, setuserData] = useState({});
  const [allergies, setAllergies] = useState([]);
  const [doctorData, setDoctorData] = useState();
  const [regularDoctor, setRegularDoctor] = useState();
  const [Age, setAge] = useState();
  const [Treatmentplandata, setTreatmentplandata] = useState();
  const [modal, setModal] = useState(false);
  const [radio, setRadio] = React.useState(false);
  const [modalAllergies, setModalAllergies] = React.useState(false);
  const [paymentAdress, setPaymentAdress] = useState({
    address: "",
    suburb: "",
    state: "",
    postcodeZip: "",
    country: "Australia",
    street: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // shcema for update patient info
  const signupSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required "),
    lastName: yup.string().required("Last Name is required"),
    contactNumber: yup.string().required("Phone number is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    billingAddress: yup.string().required("Street is required"),
    postcode: yup.string().required("ZipCode is required"),
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
    reset(userData);
  }, [userData]);

  // submit updated patient info
  const submitdata = (data) => {
    if (!phoneNumber.startsWith("0")) {
      setError('Phone number must start with "0"');
    } else {
      const body = {
        firstName:
          data?.firstName.charAt(0).toUpperCase() + data?.firstName.slice(1),
        lastName:
          data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1),
        contactNumber: phoneNumber,
        city:
          paymentAdress?.address?.length === 0
            ? data?.city
            : paymentAdress?.suburb,
        state:
          paymentAdress?.address?.length === 0
            ? data?.state
            : paymentAdress?.state,
        billingAddress:
          paymentAdress?.address?.length === 0
            ? data?.billingAddress
            : paymentAdress?.street,
        postcode:
          paymentAdress?.address?.length === 0
            ? data?.postcode
            : paymentAdress?.postcodeZip,
        currentMedicine: data?.currentMedicine ? data?.currentMedicine : "-",
      };
      ApiPut(`patient`, body)
        .then((res) => {
          getPatientdata();
          setModal(false);
          reset({
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
          });
        })
        .catch((err) => {
          ErrorToast(err?.message);
        });
    }
  };
  useEffect(() => {
    Treatmentplan();
    getPatientdata();
  }, []);

  // get treatment plan
  const Treatmentplan = async () => {
    await ApiGet(`patient/treatments/getlist`).then((res) => {
      setTreatmentplandata(
        res?.data?.data.map((ele) => {
          return {
            name: ele?.treatmentName,
            Condition: ele?.condition,
            PrescribingDoctor: `${ele?.doctor[0]?.firstName}${" "}${
              ele?.doctor[0]?.lastName
            }`,
            price: `$${ele?.price}`,
            directions: ele?.directions,
          };
        })
      );
    });
  };

  // get patient data
  const getPatientdata = () => {
    ApiGet("patient")
      .then(async (res) => {
        const addressDetail = res?.data?.data[0];
        setPaymentAdress({
          ...paymentAdress,
          suburb: addressDetail?.city,
          state: addressDetail?.state,
          street: addressDetail?.billingAddress,
          postcodeZip: addressDetail?.postcode,
          address: `${addressDetail?.billingAddress}, ${addressDetail?.city}, ${addressDetail?.state}, ${addressDetail?.postcode}`,
        });
        setPhoneNumber(res?.data?.data[0]?.contactNumber);
        await setuserData(res?.data?.data?.[0]);
        await setRegularDoctor(
          res?.data?.data?.[0]?.additionalInfo?.regularDoctor
        );
        await setDoctorData(res?.data?.data?.[0]?.doctor);
        await calculateAge(res?.data?.data[0]?.additionalInfo?.dob);
        const temp = res?.data?.data[0]?.patient_questions;
        const tempArr = [];
        temp.forEach((ele) => {
          ele.questions.map((item) => {
            tempArr.push(item);
          });
        });

        let paymentPending = [];
        res?.data?.data?.[0].paymentStatus &&
          Object.keys(res?.data?.data?.[0].paymentStatus).forEach(
            (key, index) => {
              if (res?.data?.data?.[0].paymentStatus[key] === false) {
                paymentPending.push(key);
              }
            }
          );

        setAllergies(
          tempArr.find((it) => it.qustionType === "allergies")?.answer
        );
      })
      .catch((error) => {
        console.log("error👌", error);
      });
  };

  // calculate age of patient
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setAge(age);
  };

  useEffect(() => {
    if (userData?.firstName === null && userData?.lastName === null) {
      navigate("/home");
    }
  }, [userData]);

  localStorage.setItem(
    "patientName",
    JSON.stringify(`${userData?.firstName} ${userData?.lastName}`)
  );
  // update allergies
  const updateAllergies = () => {
    let body = {
      id: userData?._id,
      allergies: !radio ? null : allergies,
    };
    if ((radio && allergies) || !radio) {
      ApiPut("patient/update/allergies", body)
        .then((res) => {
          SuccessToast(res?.data?.message);
          setModalAllergies(false);
          getPatientdata();
        })
        .catch((err) => {
          console.log("err", err);
          ErrorToast(err?.message);
        });
    } else {
      ErrorToast("Please Enter Allergies!");
    }
  };

  // handle changes
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue?.length <= 50) {
      setAllergies(inputValue);
    }
  };
  const handleInputChange1 = (e) => {
    const inputValue = e.target.value;

    setPhoneNumber(inputValue);

    if (inputValue.startsWith("0") || inputValue === "") {
      setError("");
    } else {
      setError('Phone number must start with "0"');
    }
  };

  return (
    <>
      <div className="chatscreen admindashboard patient_dashboard_main">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <div className="loader">
              <Header />
              <section className="maindashboard">
                <div
                  className="inner_div_dashboard dashdetail"
                  style={{ backgroundColor: "#FAFAFA" }}
                >
                  {/* <div
                    className="titlepatient d-flex justify-content-between align-items-center"
                    style={{ paddingLeft: 12 }}
                  >
                    <h4>Patient profile</h4>
                  </div> */}
                  <Row>
                    <Col lg={7}>
                      <Col lg={12}>
                        <Col lg={12}>
                          <div className="profilebasicdetail bg-white border border-neutral-300">
                            <ul className="basicdetail">
                              <li>
                                <div className="prodetails">
                                  <span>Name</span>
                                  <p className="text-capitalize">
                                    {userData?.firstName
                                      ? `${userData?.firstName} ${userData?.lastName}`
                                      : "-"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Phone number</span>
                                  <p>
                                    {userData?.contactNumber
                                      ? userData?.contactNumber
                                      : "-"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Email</span>
                                  <p>{userData?.email}</p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Address</span>
                                  <p>
                                    {userData?.billingAddress
                                      ? userData?.billingAddress
                                      : "-"}
                                    , {userData?.city ? userData?.city : "-"},{" "}
                                    {userData?.state ? userData?.state : "-"},{" "}
                                    {userData?.country
                                      ? userData?.country
                                      : "-"}
                                    ,{" "}
                                    {userData?.postcode
                                      ? userData?.postcode
                                      : "-"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Date Of Birth</span>
                                  <p>
                                    {userData?.additionalInfo?.dob
                                      ? userData?.additionalInfo?.dob
                                      : "-"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Current medicine</span>
                                  <p>
                                    {userData?.currentMedicine
                                      ? userData?.currentMedicine
                                      : "-"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Gender</span>
                                  <p>
                                    {userData?.gender === 0
                                      ? "Male"
                                      : userData?.gender === 1
                                      ? "Female"
                                      : userData?.gender === 2
                                      ? "Other"
                                      : "-"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Condition</span>
                                  {userData?.questionTypes &&
                                    userData?.questionTypes?.map((v) => {
                                      return (
                                        <p>
                                          {v === "STI/STD"
                                            ? "STI Screening"
                                            : v}
                                        </p>
                                      );
                                    })}
                                </div>
                              </li>
                              <li>
                                <div className="prodetails me-3">
                                  <div
                                    className="d-flex align-items-center cursor-pointer"
                                    onClick={() => {
                                      setModalAllergies(true);
                                      setRadio(
                                        userData?.allergies ? true : false
                                      );
                                      setAllergies(
                                        userData?.allergies
                                          ? userData?.allergies
                                          : ""
                                      );
                                    }}
                                  >
                                    <span style={{ color: "#18181B" }}>
                                      Allergies{" "}
                                    </span>{" "}
                                    {/* <sapn className="ms-2">
                                      <AiOutlineEdit />
                                    </sapn> */}
                                  </div>
                                  <p
                                    className="text-danger cursor-pointer text-black"
                                    // style={{
                                    //   backgroundColor: "#FA5252",
                                    //   width: "200px",
                                    //   wordBreak: "break-all",
                                    //   borderRadius: "8px",
                                    // }}
                                    onClick={() => {
                                      setModalAllergies(true);
                                      setRadio(
                                        userData?.allergies ? true : false
                                      );
                                      setAllergies(
                                        userData?.allergies
                                          ? userData?.allergies
                                          : ""
                                      );
                                    }}
                                  >
                                    {userData?.allergies
                                      ? userData?.allergies
                                      : "No"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="prodetails">
                                  <span>Age</span>
                                  <p>{Age ? `${Age} Year` : "-"}</p>
                                </div>
                              </li>
                              <a
                                onClick={() => setModal(true)}
                                className="editimg"
                              >
                                {/* <img src={edit} alt="" /> */}
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  style={{ color: "#18181B" }}
                                />
                              </a>
                            </ul>
                          </div>
                        </Col>
                      </Col>

                      {/* regular doctor detail */}
                      <Col lg={12}>
                        <Regulardoctor
                          regularDoctor={regularDoctor}
                          getPatientdata={getPatientdata}
                        />
                      </Col>

                      {/* my treating doctor */}
                      <Col lg={12}>
                        <MyTreatment doctorData={doctorData} />
                      </Col>
                    </Col>

                    <Col lg={5}>
                      {/* chat history notifications */}
                      <ChatHistory />
                      {/* patient document and upload document functionality */}
                      <Document patientid={userData?._id} />
                    </Col>

                    {/* TREATMENT PLAN HISTORY */}
                    <Col lg={12}>
                      <Prescription data={Treatmentplandata} />
                    </Col>
                  </Row>
                </div>
              </section>
            </div>
            {/* <div
              className="copyright mt-auto"
              style={{ backgroundColor: "white" }}
            >
              <p>©2023 Frenchie M.D Pty Ltd</p>
            </div> */}
          </Col>
        </Row>

        {/* modal for update allergies */}
        <Modal
          show={modalAllergies}
          onHide={() => {
            setModalAllergies(false);
            setRadio(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          className="alg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Allergies
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pb-3">
            <div className=" p-0 mx-4" style={{ marginTop: "20px" }}>
              <div className="">
                <Form>
                  <Row className="text-start">
                    <label className="text-[#18181E] mt-2">
                      Do you have any allergies?
                    </label>
                    <div className="radio text-[#18181E] mt-2">
                      <label className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="isPublished"
                          value="true"
                          className="me-3 custom-radio"
                          checked={radio === true}
                          onChange={(event) =>
                            setRadio(
                              event.currentTarget.value === "true"
                                ? true
                                : false
                            )
                          }
                        />
                        Yes
                      </label>
                    </div>
                    <div className="radio text-[#18181E]">
                      <label className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="isPublished"
                          value="false"
                          className="me-3 custom-radio"
                          checked={radio === false}
                          onChange={(event) =>
                            setRadio(
                              event.currentTarget.value === "true"
                                ? true
                                : false
                            )
                          }
                        />
                        No
                      </label>
                    </div>

                    {radio && (
                      <>
                        <label className="text-[#18181E] mt-4">Allergies</label>
                        <div className="p-2 rounded">
                          <input
                            type="text"
                            value={allergies}
                            placeholder="Enter Allergies"
                            onChange={handleInputChange}
                            className="form-control alg-input"
                          />
                        </div>
                      </>
                    )}
                  </Row>
                  <div className="btnredsubmit mt-5">
                    <Button onClick={updateAllergies}>Submit</Button>
                  </div>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* modal for update patient info */}
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
              Update Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="medicinlist doctor_mediation">
              {/* form to update paient info */}
              <Form>
                <Row>
                  <Col lg={6}>
                    <div className="medicininput">
                      <span className='text-[#18181E]'>First Name</span>
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
                      <span className='text-[#18181E]'>Last Name</span>
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
                      <span className='text-[#18181E]'>Email</span>
                      <input
                        type="text"
                        placeholder="Enter Your Email "
                        name="email"
                        disabled
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
                      <span className='text-[#18181E]'>Phone number</span>
                      <input
                        type="text"
                        placeholder="Enter Your Phone number"
                        value={phoneNumber}
                        onChange={handleInputChange1}
                        autoComplete="off"
                      />
                      {phoneNumber?.length === 0 && (
                        <p style={{ color: "red" }}>phoneNumber is required</p>
                      )}
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                  </Col>
                </Row>
                <PaymentAdress
                  paymentAdress={paymentAdress}
                  setPaymentAdress={setPaymentAdress}
                  isUpdateInfo={true}
                />

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
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
