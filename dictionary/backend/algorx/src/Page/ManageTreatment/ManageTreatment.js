import "./ManageTreatment.css";
import React, {  useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import { ApiGet } from "../../helpers/API/API_data";
import Header from "../Header/Header";

const ManageTreatment = () => {
  const [conditionType, setConditionType] = useState("");
  const [questions, setQuestions] = useState("");
  let user = JSON.parse(localStorage?.getItem("logindata"));

  useEffect(() => {
    if (window.location.pathname === "/ManageTreatment") {
      localStorage.removeItem("subscriptionType")
    }

    ApiGet("patient/get_questionFlow")
      .then((res) => {
        setQuestions(res?.data?.data?.[0]?.questions);
        let conditions = [];
        setConditionType(conditions)

        res?.data?.data?.[0]?.questions.map((val) => {
          conditions.push(val?.treatment?.questionType);
        });

        if (res?.data?.data?.[0]?.patient_questions?.length > 0) {
          let data = [];
          let d = [];
          data = res?.data?.data?.[0]?.patient_questions?.filter((val) => {
            d = val?.questions?.filter((v) => {
              if (v?.question === "What was your sex at birth?") {
                if (v?.answer === "Female") {
                  return v;
                }
              }
            });
          });
          if (d?.length > 0) {
          }
        }

      })
      .catch((err) => {
        console.log("err", err);

      });
  }, []);

// apply coupon code uniquly for diffrent conditions
  const handleLinkClick = () => {
    const treatmentData = {
      label: 'Urinary Tract Infection',
    };
    const treatmentDataJSON = JSON.stringify(treatmentData);
    localStorage.setItem('myData', treatmentDataJSON);
  };
  const handleLinkClick1 = () => {
    const treatmentData = {
      label: 'STI/STD',
    };
    const treatmentDataJSON = JSON.stringify(treatmentData);
    localStorage.setItem('myData', treatmentDataJSON);
  };
  const handleLinkClick2 = () => {
    const treatmentData = {
      label: 'Premature Ejaculation',
    };
    const treatmentDataJSON = JSON.stringify(treatmentData);
    localStorage.setItem('myData', treatmentDataJSON);
  };
  const handleLinkClick3 = () => {
    const treatmentData = {
      label: 'Erectile Dysfunction',
    };
    const treatmentDataJSON = JSON.stringify(treatmentData);
    localStorage.setItem('myData', treatmentDataJSON);
  };
  const handleLinkClick4 = () => {
    const treatmentData = {
      label: 'Thrush / Bacterial Vaginosis',
    };
    const treatmentDataJSON = JSON.stringify(treatmentData);
    localStorage.setItem('myData', treatmentDataJSON);
  };

 // apply coupon code uniquly for start over consult
  const handleStartConsult = (treatment) => {
    localStorage.setItem('newcondition', JSON.stringify(treatment?.treatment));
  };

  const handleStartConsult1 = (treatment) => {
    localStorage.setItem('newcondition', JSON.stringify(treatment?.treatment));
  };
  const handleStartConsult2 = (treatment) => {
    alert("called")
    localStorage.setItem('newcondition', JSON.stringify(treatment?.treatment));
  };
  const handleStartConsult3 = (treatment) => {
    localStorage.setItem('newcondition', JSON.stringify(treatment?.treatment));
  };
  const handleStartConsult4 = (treatment) => {
    localStorage.setItem('newcondition', JSON.stringify(treatment?.treatment));
  };


  return (
    <>
      <div className="chatscreen admindashboard">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="viewpatientmain inner_div_dashboard">
              <div className="viewpatienttitle">
                <h4>Manage Treatment</h4>
              </div>

              {/* treatment list */}
              <ul className="treatmentmanegement">
                <li>
                  <div className="treatmentmain">
                    <h3>URINARY TRACT INFECTION (UTI)</h3>
                    <p> No Active</p>
                    <p> Subscription</p>
                    <h2>
                      <br />
                      <p className="treatmentmain___inner">
                        Treatment from $20
                      </p>
                    </h2>
                    {conditionType?.includes("Urinary Tract Infection") && !(questions.find(question => {
                      return question.treatment.questionType === 'Urinary Tract Infection' && question.treatment.treatmentStatus === 3;
                    })) ? (
                      <Link
                        to={`/TreatmentDetail/?name=${"Urinary Tract Infection"}`}
                        className="btnblue resmt1"
                        onClick={handleLinkClick}
                      >
                        SEE PROGRESS
                      </Link>
                    ) : (
                      <Link
                        to={"/urinanryTractInfection"}
                        state={{ isFirstTime: false }}
                        className="btnred resmt1"
                        onClick={() => questions.find((question) => question.treatment.questionType === 'Urinary Tract Infection' && question.treatment.treatmentStatus === 3) ?
                          handleStartConsult(questions.find(question => {
                            return question.treatment.questionType === 'Urinary Tract Infection'
                          })) : () => { }}
                      >
                        Start Consult $80
                      </Link>
                    )}
                  </div>
                </li>
                <li>
                  <div className="treatmentmain">
                    <h3>STI Screening</h3>
                    <p> No Active</p>
                    <p> Subscription</p>
                    <h2>
                      <br />
                      <p className="treatmentmain___inner">
                        Treatment from $30
                      </p>
                    </h2>
                    {conditionType?.includes("STI/STD") && !(questions.find(question => {
                      return question.treatment.questionType === 'STI/STD' && question.treatment.treatmentStatus === 3;
                    })) ? (
                      <Link
                        to={`/TreatmentDetail/?name=${"STI/STD"}`}
                        className="btnblue ressti"
                        onClick={handleLinkClick1}
                      >
                        SEE PROGRESS
                      </Link>
                    ) : (
                      <Link
                        to={"/STISTD"}
                        state={{ isFirstTime: false }}
                        className="btnred ressti"
                        onClick={() => questions.find((question) => question.treatment.questionType === 'STI/STD' && question.treatment.treatmentStatus === 3) ?
                          handleStartConsult1(questions.find(question => {
                            return question.treatment.questionType === 'STI/STD'
                          })) : () => { }}
                      >
                        Start Consult $80
                      </Link>
                    )}
                  </div>
                </li>
                {user?.gender !== 1 && (
                  <li>
                    <div className="treatmentmain">
                      <h3>PREMATURE EJACULATION</h3>
                      <p> No Active</p>
                      <p> Subscription</p>
                      <h2>
                        <br />
                        <p className="treatmentmain___inner">
                          Treatment from $18{" "}
                        </p>
                        <span>/Month</span>
                      </h2>
                      {conditionType?.includes("Premature Ejaculation") && !(questions.find(question => {
                        return question.treatment.questionType === 'Premature Ejaculation' && question.treatment.treatmentStatus === 3;
                      })) ? (
                        <Link
                          to={`/TreatmentDetail/?name=${"Premature Ejaculation"}`}
                          className="btnblue respe"
                          onClick={handleLinkClick2}
                        >
                          SEE PROGRESS
                        </Link>
                      ) : (
                        <Link
                          to={"/prematureEjaculation"}
                          state={{ isFirstTime: false }}
                          className="btnred respe"
                          onClick={() => questions.find((question) => question.treatment.questionType === 'Premature Ejaculation' && question.treatment.treatmentStatus === 3) ?
                            handleStartConsult2(questions.find(question => {
                              return question.treatment.questionType === 'Premature Ejaculation'
                            })) : () => { }}
                        >
                          Start Consult $25
                        </Link>
                      )}
                    </div>
                  </li>
                )}
                {user?.gender !== 1 && (
                  <li>
                    <div className="treatmentmain">
                      <h3>ERECTILE DYSFUNCTION</h3>
                      <p> No Active</p>
                      <p> Subscription</p>
                      <h2>
                        <br />
                        <p className="treatmentmain___inner">
                          Treatment from $23{" "}
                        </p>
                        <span>/Month</span>
                      </h2>
                      {conditionType?.includes("Erectile Dysfunction") && !(questions.find(question => {
                        return question.treatment.questionType === 'Erectile Dysfunction' && question.treatment.treatmentStatus === 3;
                      })) ? (
                        <Link
                          to={`/TreatmentDetail/?name=${"Erectile Dysfunction"}`}
                          className="btnblue resed"
                          onClick={handleLinkClick3}
                        >
                          SEE PROGRESS
                        </Link>
                      ) : (
                        <Link
                          to={"/erectileDysfunction"}
                          state={{ isFirstTime: false }}
                          className="btnred resed"
                          onClick={() => questions.find((question) => question.treatment.questionType === 'Erectile Dysfunction' && question.treatment.treatmentStatus === 3) ?
                            handleStartConsult3(questions.find(question => {
                              return question.treatment.questionType === 'Erectile Dysfunction'
                            })) : () => { }}
                        >
                          Start Consult $25
                        </Link>
                      )}
                    </div>
                  </li>
                )}
                <li>
                  <div className="treatmentmain">
                    <h3>BACTERIAL VAGINOSIS (BV) / THRUSH</h3>
                    <p> No Active</p>
                    <p> Subscription</p>
                    <h2>
                      <br />
                      <p className="treatmentmain___inner">
                        Treatment from $20{" "}
                      </p>
                    </h2>
                    {conditionType?.includes("Thrush / Bacterial Vaginosis") && !(questions.find(question => {
                      return question.treatment.questionType === 'Thrush / Bacterial Vaginosis' && question.treatment.treatmentStatus === 3;
                    })) ? (
                      <Link
                        to={`/TreatmentDetail/?name=${"Thrush / Bacterial Vaginosis"}`}
                        className="btnblue  resmt"
                        onClick={handleLinkClick4}
                      >
                        SEE PROGRESS
                      </Link>
                    ) : (
                      <Link
                        to={`/thrushBaceterialVaginosis`}
                        state={{ isFirstTime: false }}
                        className="btnred resmt"
                        onClick={() => questions.find((question) => question.treatment.questionType === 'Thrush / Bacterial Vaginosis' && question.treatment.treatmentStatus === 3) ?
                          handleStartConsult4(questions.find(question => {
                            return question.treatment.questionType === 'Thrush / Bacterial Vaginosis'
                          })) : () => { }}
                      >
                        Start Consult $80
                      </Link>
                    )}
                  </div>
                </li>

                {conditionType?.includes("Sexual Pain") && !(questions.find(question => {
                  return question.treatment.questionType === 'Sexual Pain' && question.treatment.treatmentStatus === 3;
                })) ? (
                  <li>
                    <div className="treatmentmain">
                      <h3>Sexual Pain </h3>
                      <p> No Active</p>
                      <p> Subscription</p>
                      <h2>
                        <br />
                        <p className="treatmentmain___inner">
                          Treatment From $20
                        </p>
                        <span>/Month</span>
                      </h2>
                      {conditionType?.includes("Sexual Pain") ? (
                        <Link
                          to={`/TreatmentDetail/?name=${"Sexual Pain"}`}
                          className="btnblue"
                          style={{ marginTop: "47px" }}
                        >
                          SEE PROGRESS
                        </Link>
                      ) : (
                        <Link
                          to={"/sexualPain"}
                          state={{ isFirstTime: false }}
                          className="btnred"
                          style={{ marginTop: "47px" }}
                        >
                          Start Consult
                        </Link>
                      )}
                    </div>
                  </li>
                ) : (
                  ""
                )}

                {conditionType?.includes("Emergency Contraception | Plan B") && !(questions.find(question => {
                  return question.treatment.questionType === 'Emergency Contraception | Plan B' && question.treatment.treatmentStatus === 3;
                })) ? (
                  <li>
                    <div className="treatmentmain">
                      <h3>Emergency Contraception | Plan B </h3>
                      <p> No Active</p>
                      <p> Subscription</p>
                      <h2>
                        <br />
                        <p className="treatmentmain___inner">
                          Treatment From $20
                        </p>
                        <span>/Month</span>
                      </h2>
                      {conditionType?.includes(
                        "Emergency Contraception | Plan B"
                      ) ? (
                        <Link
                          to={`/TreatmentDetail/?name=${"Emergency Contraception | Plan B"}`}
                          className="btnblue"
                        >
                          SEE PROGRESS
                        </Link>
                      ) : (
                        <Link
                          to={`/`}
                          state={{ isFirstTime: false }}
                          className="btnred"
                        >
                          Start Consult
                        </Link>
                      )}
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            {/* <div className="copyright">
              <p>©2023 Frenchie M.D Pty Ltd</p>
            </div> */}
          </Col>
        </Row>

      </div>
    </>
  );
};

export default ManageTreatment;
