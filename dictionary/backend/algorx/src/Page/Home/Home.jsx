import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/logo.png";
import { Col, Modal, Row } from "react-bootstrap";
import { ErrorToast } from "../../Component/Toaster/Toaster";
import card_rpofile from "../../Assets/images/card-img-5.png";
import card_rpofile2 from "../../Assets/images/card-img-2.png";
import card_rpofile3 from "../../Assets/images/card-img-3.png";
import card_rpofile4 from "../../Assets/images/card-img-6.jpg";
import Card from "../CommonComponent/Card";
import User from "../../Assets/user.png";
import Mail from "../../Assets/mail.png";
import Number from "../../Assets/call.png";
import { ApiPost, ApiPostNoAuth, ApiPut } from "../../helpers/API/API_data";
import Auth from "../../helpers/Auth";
import { email } from "../../helpers/regex";
import { appContext } from "../../helpers/AppContext";
import Loader from "../../Component/Loader/Loader";

// custom modal
function CustomBlueModal(props) {
  const navigate = useNavigate();
  const [allow, setAllow] = useState(false);

  // handle submit out-sider austrelia
  const handleSubmit = () => {
    let userData = JSON.parse(localStorage.getItem("logindata"));
    ApiPostNoAuth("patient/outSider", userData)
      .then((res) => {
        localStorage.clear();
      })
      .catch((err) => {
        console.log("err", err);
        ErrorToast(err?.message);
      });
  };

  // handle next according to screen
  const next1 = () => {
    props.setQuestionNumber(1);
    props.setModalShow(!props.modalShow);
    // props.setUserData({});
  };
  const next2 = () => {
    props.setModalShow(!props.modalShow);
    props.setQuestionNumber(1);
    if (allow) {
      handleSubmit();
    }
  };
  const next3 = () => {
    localStorage.setItem(
      "answer",
      JSON.stringify([
        { ...props.userData, _id: Math.random().toString(16).slice(2) },
      ])
    );
    navigate("/");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={props?.heading && "complete"}>
        <h4>{props?.heading}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: props?.subHeading,
          }}
        ></div>
        <div className="">
          <input
            type="checkbox"
            className="me-2"
            onChange={(e) => setAllow(e.target.checked)}
          />
          allow for email updates
        </div>
      </Modal.Body>

      <div className="btnnext">
        <button
          onClick={
            props.modalCount === 1
              ? next1
              : props.modalCount === 2
              ? next2
              : next3
          }
        >
          {props?.modalCount === 2 ? "Submit" : "Next"}
        </button>
      </div>
    </Modal>
  );
}

const Home = () => {
  const [questionNumber, setQuestionNumber] = useState(5);
  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalCount, setModalCount] = useState(0);
  const [addressdata, setAddressdata] = useState();
  const [country, setCountry] = useState();
  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const { loader, setLoader } = useContext(appContext);
  let params = new URL(document.location).searchParams;
  let isEdit = params.get("isedit");

  const navigate = useNavigate();
  const [defaultData, setDefaultData] = useState("");

  // pre-filled all field on edit
  useEffect(() => {
    if (isEdit) {
      setQuestionNumber(1);
      setDefaultData(JSON.parse(localStorage.getItem("logindata")));
    }
  }, []);

  useEffect(() => {
    setUserData(defaultData);
  }, [defaultData]);

  // handle patient sign-up input values
  const handleUserData = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      setUserData({
        ...userData,
        dob: new Date(value),
      });
    } else if (name === "firstName") {
      setUserData({
        ...userData,
        [name]:
          value.trimStart().charAt(0).toUpperCase() +
          value.trimStart().slice(1),
      });
    } else if (name === "lastName") {
      setUserData({
        ...userData,
        [name]:
          value.trimStart().charAt(0).toUpperCase() +
          value.trimStart().slice(1),
      });
    } else {
      setUserData({
        ...userData,
        [name]: value.trimStart(),
      });
    }
  };

  // google map auto complete
  useEffect(() => {
    if (window && questionNumber === 1) {
      autoCompleteRef.current =
        window?.google?.maps &&
        new window.google.maps.places.Autocomplete(inputRef?.current);
      autoCompleteRef.current?.addListener("place_changed", handlePlaceChanged);
    }
  }, [questionNumber]);

  const handlePlaceChanged = () => {
    const place = autoCompleteRef?.current?.getPlace();
    const countryName = place.address_components.find((ele) =>
      ele.types.includes("country")
    ).long_name;
    setCountry(countryName);
    const Addressdata =
      place.name +
      place.address_components
        .map((item, i) =>
          i !== 0 && i !== place.address_components.length - 1
            ? item.long_name
            : ""
        )
        .toString();
    setAddressdata(Addressdata);
  };

  useEffect(() => {
    setUserData({
      ...userData,
      address: addressdata,
      country: country,
    });
  }, [addressdata, country]);

  const openLast = () => {
    setModalCount(3);
    setModalShow(true);
  };

  const data = JSON.parse(localStorage.getItem("logindata"));
  const updateData = async () => {
    if (
      userData?.firstName &&
      userData?.lastName &&
      userData?.email &&
      userData?.contactNumber
    ) {
      if (
        questionNumber === 1 &&
        userData.country &&
        userData.country === "Australia"
      ) {
        setModalCount(1);
        setModalShow(!modalShow);
      } else {
        const body = {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          gender: userData?.gender,
          contactNumber: userData?.contactNumber?.toString(),
          address: userData?.address,
          additionalInfo: {
            dob: userData?.dob,
          },
        };
        await ApiPut(`patient`, body)
          .then((res) => {
            const data = JSON.parse(localStorage.getItem("logindata"));
            const data1 = {
              ...data,
              firstName:
                userData?.firstName.charAt(0).toUpperCase() +
                userData?.firstName.slice(1),
              lastName:
                userData?.lastName.charAt(0).toUpperCase() +
                userData?.lastName.slice(1),
              address: userData.address,
              dob: userData?.dob,
              gender: userData?.gender,
              contactNumber: userData?.contactNumber,
            };
            localStorage.setItem("logindata", JSON.stringify(data1));
            navigate(`/dashboard`);
          })
          .catch((error) => {
            if (error?.status === 410) {
              ErrorToast(error?.message);
              localStorage.removeItem("userData");
              localStorage.removeItem("token");

              setTimeout(() => {
                navigate("/");
              }, 100);
            }
          });
      }
    } else {
      ErrorToast("All fields are required!");
    }
  };

  // handle let's get start event
  const handleStart = () => {
    if (questionNumber === 5) {
      setQuestionNumber(1);
    }
  };

  // handle next screen
  const handleNext = (e) => {
    if (questionNumber === 1) {
      if (
        userData?.firstName &&
        userData?.lastName &&
        userData?.contactNumber &&
        userData?.email
      ) {
        if (!parseInt(userData?.contactNumber)) {
          ErrorToast("Contact Number Is Number!");
        } else if (!userData?.email?.match(email)) {
          ErrorToast("Enter Valid Email!");
        } else if (
          !(
            userData?.contactNumber.substring(0, 3) === "+61" ||
            userData?.contactNumber.substring(0, 1) === "0"
          )
        ) {
          ErrorToast("Please Enter Your country code or 0");
        } else {
          setQuestionNumber(questionNumber + 1);
          const data = JSON.parse(localStorage.getItem("logindata"));
          const data1 = {
            ...data,
            firstName:
              userData?.firstName.charAt(0).toUpperCase() +
              userData?.firstName.slice(1),
            lastName:
              userData?.lastName.charAt(0).toUpperCase() +
              userData?.lastName.slice(1),
            address: userData.address,
            dob: userData?.dob,
            gender: userData?.gender,
            contactNumber: userData?.contactNumber,
            email: userData?.email,
          };
          localStorage.setItem("logindata", JSON.stringify(data1));
        }
      } else {
        ErrorToast("All Fields Are Required!");
      }
    } else if (questionNumber === 2) {
      if (userData?.country) {
        if (userData?.country !== "Australia") {
          setModalCount(2);
          setModalShow(true);
        } else {
          setQuestionNumber(4);
        }
      } else {
        ErrorToast("Select One Value!");
      }
    } else if (questionNumber === 4) {
      localStorage.setItem(
        "answer",
        JSON.stringify([
          { ...userData, _id: Math.random().toString(16).slice(2) },
        ])
      );
      setLoader(true);
      ApiPost("patient/signup_guest", userData)
        .then((res) => {
          setLoader(false);
          Auth.setAuthToken(res?.data?.data?.token);
          localStorage.setItem("logindata", JSON.stringify(res?.data?.data));
          // navigate("/condition");
          setModalShow(false);

          navigate("/condition");
        })
        .catch((err) => {
          ErrorToast(err.message);
          setQuestionNumber(1);
          setUserData({});
          setModalShow(false);
          setLoader(false);
        });
    } else {
      ErrorToast("Please Select Any One!");
    }
  };

  return (
    <>
      <section className="condition home edit_patient_main">
        <div className="loginimglogo conlogo">
          
          <img src={Logo} alt="" />
        </div>
        <div className="conditionmain">
          <div className="borderdiv">
            <div className="conditioninfo" style={{ maxWidth: "1000px" }}>
              {questionNumber === 5 && (
                <div className="conditionsub">
                  <h3 className="font-semibold text-2xl text-center px-3 sm:px-0 text-neutral-900">
                    Hi, before we get started...
                  </h3>
                  <h3
                    className="conditionsubb font_14_para_title"
                    style={{ textTransform: "unset" }}
                  >
                    We are going to ask questions about your health to best
                    inform our practitioners of your journey so far. Our
                    healthcare team will review your answers before the consult
                    so they can provide the best care possible.
                  </h3>
                </div>
              )}
              {questionNumber === 1 && (
                <>
                  <div className="conditionsub">
                    <h3
                      className="conditionsubb edit_patient_head"
                      style={{ textTransform: "unset" }}
                    >
                      Okay, Now let's start with your name and the best way we
                      can contact you.
                    </h3>
                    <p>
                      Your doctor will need these details to contact you and
                      arrange to ship your treatment if required
                    </p>
                  </div>
                  <Row>
                    <Col lg={6}>
                      <div className="mt-3 home_inputs">
                        <div className="selectgender1 exercise">
                          <label>
                            {" "}
                            <img src={User} alt="" /> First Name*
                          </label>
                          <input
                            placeholder="Your First Name"
                            value={userData?.firstName}
                            onChange={handleUserData}
                            name="firstName"
                          ></input>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="home_inputs mt-3">
                        <div className="selectgender1 exercise">
                          <label>
                            <img src={User} alt="" /> Last Name*
                          </label>
                          <input
                            placeholder="Your Last Name"
                            value={userData?.lastName}
                            onChange={handleUserData}
                            name="lastName"
                          ></input>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="home_inputs mt-3">
                        <div className="selectgender1 exercise">
                          <label>
                            {" "}
                            <img src={Mail} alt="" />
                            Email*
                          </label>
                          <input
                            placeholder="Your Email Address"
                            value={data?.email}
                            onChange={handleUserData}
                            name="email"
                            // disabled
                          ></input>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="home_inputs mt-3">
                        <div className="selectgender1 exercise">
                          <label>
                            {" "}
                            <img src={Number} alt="" />
                            Contact Number*
                          </label>
                          <input
                            maxLength={11}
                            placeholder="Your Contact Number"
                            value={userData?.contactNumber}
                            onChange={handleUserData}
                            name="contactNumber"
                          ></input>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}

              {questionNumber === 2 && (
                <>
                  <div className="conditionsub2">
                    <h3>Hi {userData?.firstName}, </h3>
                    <h3>first we need to make sure we have healthcare providers in your location.</h3>
                  </div>
                  <div className="checktab">
                    <select
                      className="gender_select"
                      name="country"
                      onChange={handleUserData}
                    >
                      <option defaultValue disabled selected>
                        Select the state
                      </option>
                      <option value="Outside of Australia">
                        Outside of Australia
                      </option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </>
              )}

              {questionNumber === 3 && (
                <>
                  <div className="conditionsub">
                    <h3 className="conditionsub_postcode">
                      What is your postcode?
                    </h3>
                  </div>
                  <div className="checktab">
                    <div className="checktab">
                      <div className="selectgender1 exercise">
                        <input
                          type="number"
                          placeholder="Enter postcode"
                          value={userData?.postcode}
                          onChange={handleUserData}
                          name="postcode"
                        ></input>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {questionNumber === 4 && (
                <div className="how-goes-it-work-main">
                  <h1 className="title " style={{ textTransform: "unset" }}>
                    Hi{" "}
                    <span className="text-capitalize">
                      {userData?.firstName}
                    </span>
                    , below is an overview of how it works.{" "}
                  </h1>
                  <Card
                    card_img={card_rpofile}
                    card_number={1}
                    card_title={"Online Assessment"}
                    card_description={
                      "Answer some questions about your condition and medical history to see if we can help "
                    }
                  />
                  <Card
                    card_img={card_rpofile2}
                    card_number={2}
                    card_title={"Doctor Consult"}
                    card_description={
                      "Questions and text based consult. Our consult fee will vary between each health concern and will also include any Pathology tests. The fee will be disclosed at the end of your questionnaire."
                    }
                  />
                  <Card
                    card_img={card_rpofile3}
                    card_number={3}
                    card_title={
                      "Doctor will review and advise what your treatment plan is and ask for your confirmation"
                    }
                    card_description={
                      "Your treating doctor will provide a treatment plan for the best health outcome."
                    }
                  />
                  <Card
                    card_img={card_rpofile4}
                    card_number={4}
                    card_title={"Pharmacy Ships Discreetly to your door"}
                    card_description={
                      "Free express shipping directly to your door. No more waiting in pharmacy queues."
                    }
                  />
                </div>
              )}

              <div className="btnnext align agree-btn">
                {isEdit ? (
                  <button onClick={updateData}>Update</button>
                ) : questionNumber === 5 ? (
                  <button className="btn" onClick={handleStart}>
                    LET'S GET STARTED
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      handleNext(e);
                    }}
                    className=" ms-2"
                  >
                    {questionNumber === 4 ? (
                      "Agree"
                    ) : (
                      <>
                        <span>Next&nbsp;</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-arrow-right-long"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
              {questionNumber === 4 && (
                <div className="terms_conditions">
                  <p>
                    By Clicking ‘Continue’ you agree to our{" "}
                    <a
                      href="https://fmdlanding.d1p3ia2k022sjx.amplifyapp.com/terms-and-conditions"
                      target="_blank"
                    >
                      {" "}
                      Terms & conditions{" "}
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://fmdlanding.d1p3ia2k022sjx.amplifyapp.com/privacy-policy"
                      target="_blank"
                    >
                      {" "}
                      Privacy Policy{" "}
                    </a>{" "}
                    and consent to telehealth.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <CustomBlueModal
          subHeading={
            modalCount === 1
              ? `<p>Message “Sorry, consults aren’t currently available in your territory. We’re working towards having this available soon. Be the first to know by ticking box to allow for email updates.</p>`
              : modalCount === 2
              ? `   <div className="australia_text_box mt-5">
              <div className="australia_text_box_inner">
                <p>“Sorry, consults aren’t currently available in your territory. We’re working towards having this available soon. Be the first to know by ticking box to allow for email updates.</p>
              </div>
            </div> `
              : modalCount === 3
              ? `<p>Before we start we’re just going to ask you some simple questions about your overall health to get started. Not to worry this information is only shared with your Doctor. It should only take a few minutes.</p>`
              : ""
          }
          show={modalShow}
          onHide={() => setModalShow(!modalShow)}
          setModalShow={setModalShow}
          modalShow={modalShow}
          setQuestionNumber={setQuestionNumber}
          setUserData={setUserData}
          modalCount={modalCount}
          openLast={openLast}
          userData={userData}
        />
      </section>
      {loader && <Loader />}
    </>
  );
};

export default Home;
