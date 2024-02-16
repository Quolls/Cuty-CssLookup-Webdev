import React, { useState } from "react";
import { STISTDData, codition } from "../../data/jsonData";
import Logo from "../../Assets/images/logo.png";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import { Modal } from "react-bootstrap";
import { ErrorToast } from "../../Component/Toaster/Toaster";
import { useLocation, useNavigate } from "react-router-dom";
import { isEighteenYearsOld } from "../../utils/dateAndTime";
import { ApiPost } from "../../helpers/API/API_data";
import { useEffect } from "react";
import { Link } from "@mui/material";
import Loader from "../../Component/Loader/Loader";
let STISTDJson = [...STISTDData];
const StiStdFlow = () => {
  // hook and local storage
  const userData = JSON.parse(localStorage.getItem("logindata"));
  const navigate = useNavigate();
  const location = useLocation();

  //   state
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(
    userData?.questionTypes?.length > 0 ? 6 : 0
  );
  const [isNoNote, setisNoNote] = useState(false);
  //
  const [count, setcount] = useState(0);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [modalShow, setModalShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState(userData?.questionTypes?.length > 0 ? 7 : 1);
  const [centi, setCenti] = useState("CM");

  //   effect
  // set current screen anser
  useEffect(() => {
    window.scroll(0, 0);
    let uni = STISTDJson.findIndex((item) => item.id === id);
    setFirst(uni);
  }, [id]);

  useEffect(() => {
    if (userData?.questionTypes?.length > 0) {
      setid(7);
    }
  }, []);

  // create cm data
  var cmDropDpwn = [];

  for (var i = 130; i <= 250; i++) {
    cmDropDpwn.push(i);
  }

  //   event handler
  // handle inputs values
  const addnew = (anwser, key) => {
    // debugger
    if (key == "check") {
      const foundObject = STISTDJson[first].answer.find(
        (item) => item.noneflag === true
      );
      const index1 = STISTDJson[first].useranwser.indexOf(
        foundObject?.answerName
      );

      if (index1 !== -1) {
        STISTDJson[first].useranwser.splice(index1, 1);
      }
      const index = STISTDJson[first].useranwser.indexOf(anwser);

      if (index === -1) {
        // String not found, add it
        STISTDJson[first].useranwser.push(anwser);
      } else {
        // String found, remove it
        STISTDJson[first].useranwser.splice(index, 1);
      }
    } else {
      STISTDJson[first].useranwser = anwser;
    }
    setcount(count + 1);
  };
  // handle prev screen
  const prevnew = () => {
    if (first === 0 || (first === 6 && userData?.questionTypes?.length > 0)) {
      navigate(
        location?.state?.isFirstTime === false
          ? "/ManageTreatment"
          : "/condition"
      );
    }
    if (
      STISTDJson[first - 1].isCheckbox &&
      STISTDJson[first - 1].useranwser === "No Notes"
    ) {
      setisNoNote(true);
      STISTDJson[first].useranwser = "No Notes";
    }
    if (STISTDJson[first]?.doubleflow) {
      let uni = STISTDJson.findIndex(
        (item) => item.id === STISTDJson[first].retrunid
      );
      let foundObject = STISTDJson[uni].answer.find(
        (item) => item.answerName === STISTDJson[uni].useranwser
      );

      // IF TRIPLEFLOW
      if (foundObject?.isNestedFlow) {
        let nestedIndex = STISTDJson.findIndex(
          (item) => item.id === foundObject.nestedReturnId
        );
        const selectedAnswer = STISTDJson[nestedIndex]?.useranwser;
        if (
          selectedAnswer?.includes("Female") ||
          selectedAnswer?.includes("Trans Masculine / Trans Male")
        ) {
          setid(STISTDJson[nestedIndex]?.id);
        } else {
          let prevIndex = STISTDJson.findIndex(
            (item) => item.id === STISTDJson[nestedIndex]?.answer[0].nestedPrev
          );
          let nestedAnswerOBJ = STISTDJson[prevIndex].answer.find(
            (item) => item.answerName === STISTDJson[prevIndex].useranwser
          );
          setid(nestedAnswerOBJ.prev);
        }
      } else {
        if (!foundObject) {
          const filteredObjects = STISTDJson[uni].answer.filter((obj) =>
            STISTDJson[uni].useranwser.includes(obj.answerName)
          );
          setid(filteredObjects[0].prev);
        } else {
          setid(foundObject.prev);
        }
      }
    } else {
      setid(STISTDJson[first].prev);
    }
  };

  // remove double flow answer and unanswer
  const handleResetAnswerOfdouble = () => {
    let findindex = STISTDJson.findIndex(
      (item) => item.id === STISTDJson[first].retrunid
    );
    const findAnswer = STISTDJson[findindex];
    let tempobj = [];
    if (findAnswer.useranwser === "No" && findAnswer.isAnswerNo) {
      setisNoNote(false);
      STISTDJson?.forEach((element) => {
        if (findAnswer.noAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    } else if (
      findAnswer?.useranwser === "Female" ||
      findAnswer?.useranwser === "Trans Masculine / Trans Male"
    ) {
      STISTDJson?.forEach((element) => {
        if (findAnswer.noAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    } else if (
      findAnswer?.isNoNestedAnswer &&
      (findAnswer?.useranwser === "Male" ||
        findAnswer?.useranwser === "Trans Feminine / Trans Female" ||
        findAnswer?.useranwser === "I don’t Identify with any of the above")
    ) {
      const nestedAnswer = STISTDJson?.find((item) => item.id === 10);
      if (
        nestedAnswer?.useranwser.includes("Female") ||
        nestedAnswer?.useranwser.includes("Trans Masculine / Trans Male")
      ) {
        STISTDJson?.forEach((element) => {
          if (nestedAnswer.nestedAnswerIds.includes(element.id)) {
            tempobj.push({ ...element, useranwser: [] });
          } else {
            tempobj.push(element);
          }
        });
      } else {
        const nestedAnswerYesNo = STISTDJson?.find((item) => item.id === 11);
        if (nestedAnswerYesNo?.useranwser === "Yes") {
          STISTDJson?.forEach((element) => {
            if (nestedAnswerYesNo.nestedAnswerIds.includes(element.id)) {
              tempobj.push({ ...element, useranwser: [] });
            } else {
              tempobj.push(element);
            }
          });
        }
      }
    }
    return tempobj?.length ? tempobj : STISTDJson;
  };
  // handle next screen
  const nextnew = async () => {
    // debugger

    // logic to remove next
    if (STISTDJson[first].isnoAnserRemove) {
      const resetAnswerOfdouble = handleResetAnswerOfdouble();
      STISTDJson = [...resetAnswerOfdouble];
    }
    // if flow done
    if (STISTDJson[first].next == "done") {
      setLoading(true);

      let data = calldata();
      let getQuestionsData = JSON.parse(localStorage.getItem("answer"));

      const payamount = codition[2]?.price || 80;
      const bloodTestAnswer = data?.find(
        (item) =>
          item?.question ===
          "Would you like a blood test to include a test for HIV and Syphillis?"
      );

      const body = {
        questions: getQuestionsData ? [...getQuestionsData, ...data] : data,
        questionType: "STI/STD",
        paymentAmount: payamount,
      };
      await ApiPost("patient/patient_question", body)
        .then((response) => {
          let questionTypes = codition.find((res) => res.label === "STI/STD");
          questionTypes.price = payamount;
          localStorage.setItem(
            "questionTypes",
            JSON.stringify({
              ...questionTypes,
              questionId: response?.data?.data?.questionId,
              consultation_id: response?.data?.data?.consultation_id,
            })
          );
          if (bloodTestAnswer?.answer === "Yes") {
          } else {
            localStorage.removeItem("isPay");
          }
          navigate(
            location?.state?.isFirstTime === false
              ? "/payment"
              : "/paymentSummary",
            { state: { isPay: true, pathologyTestCharge: 50 } }
          );
        })
        .catch((err) => {
          navigate(
            location?.state?.isFirstTime === false
              ? "/ManageTreatment"
              : "/condition"
          );
          return console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (STISTDJson[first].isCheckbox && isNoNote) {
      STISTDJson[first].useranwser = "No Notes";
      setisNoNote(false);
    }
    if (!STISTDJson[first].useranwser && STISTDJson[first].key !== "date") {
      return ErrorToast("Please attempt this question");
    }
    if (
      STISTDJson[first].useranwser?.length == 0 &&
      STISTDJson[first].key === "check"
    ) {
      return ErrorToast("Please attempt this question");
    }
    if (STISTDJson[first].key === "date") {
      let newData = `${year}-${Number(month) + 1}-${day}`;
      if (!year && !month && !day) {
        return ErrorToast("Please attempt this question");
      } else {
        var isAdult = isEighteenYearsOld(newData);

        if (isAdult) {
          await addnew(`${day}-${Number(month) + 1}-${year}`);
          setid(STISTDJson[first].next);
        } else {
          setid(STISTDJson[first].notvalid);
        }
      }
    } else {
      if (STISTDJson[first].nextsub) {
        if (STISTDJson[first]?.isNextDouble) {
          let uni = STISTDJson.findIndex(
            (item) => item.id === STISTDJson[first].nextReturnId
          );

          const selectedAnswer = STISTDJson[uni]?.answer?.find(
            (item) => item?.answerName === STISTDJson[uni]?.useranwser
          );

          if (selectedAnswer?.highRiskNext) {
            setid(selectedAnswer?.highRiskNext);
          } else {
            const userAnswer = STISTDJson[first].useranwser;
            if (
              userAnswer.includes("Female") ||
              userAnswer.includes("Trans Masculine / Trans Male")
            ) {
              setid(12);
            } else {
              setid(11);
            }
          }
        } else {
          const foundObject = STISTDJson[first].answer.find(
            (item) => item.answerName === STISTDJson[first].useranwser
          );
          if (!foundObject) {
            const filteredObjects = STISTDJson[first].answer.filter((obj) =>
              STISTDJson[first].useranwser.includes(obj.answerName)
            );
            setid(filteredObjects[0].next);
          } else {
            setid(foundObject.next);
          }
        }
      } else {
        setid(STISTDJson[first].next);
      }
    }
  };

  // remove modal and not attempt question object fron json
  const calldata = () => {
    let removemodel;
    if (userData?.questionTypes?.length > 0) {
      let slicemain = STISTDJson.slice(6);
      removemodel = slicemain.filter((obj) => obj.key !== "model");
    } else {
      removemodel = STISTDJson.filter((obj) => obj.key !== "model");
    }

    const removeUnAnswer = removemodel.filter((item) => {
      if (!item?.useranwser?.length) {
        return false;
      }
      return true;
    });

    const id = "_id";
    const que = "question";
    const ans = "answer";
    const oth = "otherAns";

    return removeUnAnswer.map((obj) => {
      let userOtherMultipleAnswer = [];
      if (obj?.isOtherMultiple) {
        const mupltAnswerPossibility = [
          "Other",
          "Skin changes (specify)",
          "Mild pain elsewhere (specify)",
        ];

        const filterAnswer = obj?.useranwser.filter((item) =>
          mupltAnswerPossibility?.includes(item)
        );
        const filterdOtherAnswer = obj?.answer.filter((item) =>
          filterAnswer?.includes(item?.answerName)
        );
        filterdOtherAnswer.forEach((element) => {
          userOtherMultipleAnswer.push(element?.otherUniqueKey);
        });
      }
      return {
        [`${id}`]: Math.random().toString(16).slice(2),
        [`${que}`]: obj["question"],
        [`${ans}`]: obj["useranwser"],
        [`${oth}`]: obj?.isOtherMultiple
          ? userOtherMultipleAnswer
          : obj["userotheranwser"],
      };
    });
  };

  const handleHeadingModal = () => {
    if (STISTDJson[first]?.menu) {
      navigate(
        location?.state?.isFirstTime === false
          ? "/ManageTreatment"
          : "/condition"
      );
    } else if (STISTDJson[first]?.id === 27) {
    }
  };
  return (
    <>
      <section className="condition">
        <div className="loginimglogo conlogo">
          <img src={Logo} alt="" />
        </div>
        {loading && <Loader />}
        <div className="conditionmain">
          <div className="borderdiv">
            <div
              className={`${
                STISTDJson[first]?.ui === 1
                  ? "d-flex flex-column justify-contant-center questionBody"
                  : "conditioninfo"
              }`}
            >
              <>
                <div className="conditionsub">
                  <h3 className="what_your_sex_head">
                    {STISTDJson[first]?.question}
                  </h3>
                  <div className="flow-sub-heading-wrapper">
                    <h5 className="flow-heading">
                      {STISTDJson[first]?.subQuestion
                        ? STISTDJson[first]?.subQuestion
                        : ""}
                    </h5>
                  </div>
                </div>
                <div className="checktab">
                  {STISTDJson[first]?.key === "option" ? ( //input as options
                    <div
                      className={`selectgender ${
                        STISTDJson[first]?.answer.length > 9 && "optionSet"
                      }`}
                    >
                      {STISTDJson[first]?.answer.map((ans, i) => {
                        return (
                          <>
                            <div className="male">
                              <input
                                type="radio"
                                id={i}
                                name="age"
                                value={ans.answerName}
                                checked={
                                  STISTDJson[first].useranwser == ans.answerName
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  addnew(e.target.value, "option");
                                }}
                                style={{ width: "0px", padding: "0px" }}
                              />
                              <label for={i}>{ans.answerName}</label>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : STISTDJson[first]?.key === "check" ? ( //input as checkbox
                    <div className="selectgender">
                      {STISTDJson[first]?.answer.map((ans, i) => {
                        return (
                          <>
                            <div className="male">
                              <input
                                type={"checkbox"}
                                id={i}
                                name="age"
                                value={ans.answerName}
                                checked={
                                  STISTDJson[first].useranwser &&
                                  STISTDJson[first].useranwser.includes(
                                    ans.answerName
                                  )
                                }
                                onChange={(e) => {
                                  if (ans.noneflag) {
                                    STISTDJson[first].useranwser = [
                                      e.target.value,
                                    ];
                                    setcount(count + 1);
                                  } else {
                                    addnew(e.target.value, "check");
                                  }
                                }}
                                style={{ width: "0px", padding: "0px" }}
                              />
                              <label for={i}>{ans.answerName}</label>
                            </div>
                            {STISTDJson[first]?.answer[i]?.isFlag &&
                              STISTDJson[first].useranwser &&
                              STISTDJson[first].useranwser.includes(
                                ans.answerName
                              ) && (
                                <div>
                                  <div>
                                    <textarea
                                      style={{ marginBottom: "16px" }}
                                      value={
                                        STISTDJson[first].answer[i]
                                          .otherUniqueKey.value
                                      }
                                      onChange={(e) => {
                                        if (
                                          STISTDJson[first]?.isOtherMultiple
                                        ) {
                                          STISTDJson[first].answer[
                                            i
                                          ].otherUniqueKey.value =
                                            e.target.value;
                                        } else {
                                          STISTDJson[first].userotheranwser =
                                            e.target.value;
                                        }

                                        setcount(count + 1);
                                      }}
                                    ></textarea>
                                  </div>
                                </div>
                              )}
                          </>
                        );
                      })}
                    </div>
                  ) : STISTDJson[first]?.key === "date" ? ( // input as date picker
                    <div className="dateDrop">
                      <div className=" ">
                        <DayPicker
                          defaultValue={"DD"}
                          year={year} // mandatory
                          month={month} // mandatory
                          endYearGiven // mandatory if end={} is given in YearPicker
                          value={day} // mandatory
                          onChange={(e) => {
                            // setAnswer(e);
                            // setChange(true);
                            setDay(e);
                          }}
                          id={"day"}
                          name={"day"}
                          classes={"list1 px-3 py-2 mx-2"}
                          optionClasses={""}
                          // disabled
                        />

                        <MonthPicker
                          defaultValue={"MM"}
                          numeric // to get months as numbers
                          short // default is full name
                          caps // default is Titlecase
                          endYearGiven // mandatory if end={} is given in YearPicker
                          year={year} // mandatory
                          value={month} // mandatory
                          onChange={(e) => {
                            setMonth(e);
                          }}
                          id={"month"}
                          name={"month"}
                          classes={"list1 px-3 py-2 mx-2"}
                          optionClasses={""}
                        />

                        <YearPicker
                          defaultValue={"YYYY"}
                          reverse // default is ASCENDING
                          value={year} // mandatory
                          onChange={(year) => {
                            setYear(year);
                          }}
                          id={"year"}
                          name={"year"}
                          classes={"list1 px-3 py-2 mx-2"}
                          optionClasses={""}
                        />
                      </div>
                    </div>
                  ) : STISTDJson[first]?.key === "textarea" ? ( // input as date textarea
                    <div className="checktab">
                      <div className="selectgender exercise">
                        <textarea
                          value={STISTDJson[first].useranwser}
                          onChange={(e) => {
                            if (STISTDJson[first].isCheckbox && isNoNote) {
                              STISTDJson[first].useranwser = "";
                            } else {
                              STISTDJson[first].useranwser = e.target.value;
                            }

                            setcount(count + 1);
                          }}
                        ></textarea>
                        {(STISTDJson[first]?.question ===
                          "Is there anything else you would like to say to the Doctor?" ||
                          STISTDJson[first]?.question ===
                            "What medications or supplements are you currently taking?") && (
                          <div className="text-start mt-2 d-flex">
                            <input
                              type="checkbox"
                              style={{ width: "fit-content" }}
                              checked={isNoNote}
                              onChange={(e) => {
                                setisNoNote(!isNoNote);
                                setcount(count + 1);
                              }}
                            />{" "}
                            <span className="ms-2" style={{ color: "#0065C0" }}>
                              I don’t have anything else to add.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : STISTDJson[first]?.key === "model" ? ( // qsn obj as modal
                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      backdrop="static"
                      keyboard={false}
                      show={modalShow}
                      onHide={() => setModalShow(!modalShow)}
                    >
                      {STISTDJson[first]?.isVerticle ? (
                        <Modal.Body
                          className={STISTDJson[first]?.heading && "complete"}
                        >
                          <p
                            style={{
                              color: " #fff",
                              marginTop: "25px",
                              fontWeight: "bold",
                              fontSize: "2.0vh",
                              display: "block",
                              lineHeight: "24px",
                            }}
                          >
                            You should seek urgent in person medical attention.
                            <br /> Options for in person care and/or treatment -
                            links can direct to services in the person's area
                            <br />
                            Find a Sexual Health Clinic
                            <br />
                            <br />
                            NSW:{" "}
                            <Link
                              className="vertical-modal"
                              href="https://shil.nsw.gov.au"
                              target="_blank"
                            >
                              {" "}
                              https://shil.nsw.gov.au/{" "}
                            </Link>{" "}
                            QLD:{" "}
                            <Link
                              className="vertical-modal"
                              href="https://stoptherise.initiatives.qld.gov.au"
                              target="_blank"
                            >
                              https://stoptherise.initiatives.qld.gov.au/
                            </Link>
                            <br />
                            SA:{" "}
                            <Link
                              className="vertical-modal"
                              href="https://shinesa.org.au"
                              target="_blank"
                            >
                              {" "}
                              https://shinesa.org.au/
                            </Link>
                            <br />
                            WA:{" "}
                            <Link
                              className="vertical-modal"
                              href="https://shq.org.au"
                              target="_blank"
                            >
                              {" "}
                              https://shq.org.au/
                            </Link>
                            <br />
                            VIC:
                            <Link
                              className="vertical-modal"
                              href="https://www.mshc.org.au"
                              target="_blank"
                            >
                              {" "}
                              https://www.mshc.org.au/
                            </Link>{" "}
                            OR{" "}
                            <Link
                              className="vertical-modal"
                              href="https://shvic.org.au/"
                              target="_blank"
                            >
                              https://shvic.org.au/{" "}
                            </Link>
                            OR{" "}
                            <Link
                              className="vertical-modal"
                              href="https://www.staystifree.org.au"
                              target="_blank"
                            >
                              https://www.staystifree.org.au/{" "}
                            </Link>
                            <br />
                            TAS:
                            <Link
                              className="vertical-modal"
                              href="https://www.health.tas.gov.au/health-topics/sexual-and-reproductive-health"
                              target="_blank"
                            >
                              {" "}
                              https://www.health.tas.gov.au/health-topics/sexual-and-reproductive-health
                            </Link>
                            <br />
                            NT:{" "}
                            <Link
                              className="vertical-modal"
                              href="https://www.ntahc.org.au/clinics"
                              target="_blank"
                            >
                              {" "}
                              https://www.ntahc.org.au/clinics
                            </Link>
                            <br />
                            See your local GP
                            <br />
                            <br />
                            Find an LGBTQ+-Friendly GP DocDir - Australia-wide
                            directory of LGBTQ+ inclusive clinicians and
                            services
                            <Link
                              className="vertical-modal"
                              href="https://docdir.org.au/"
                              target="_blank"
                            >
                              {" "}
                              https://docdir.org.au/
                              <br />{" "}
                            </Link>
                            <br />
                            If you have severe symptoms, present to your <br />{" "}
                            Emergency Department, call 000, or call HealthDirect{" "}
                            <br /> Australia on 1800 022 222 to speak with a
                            nurse.
                          </p>
                        </Modal.Body>
                      ) : (
                        <Modal.Body
                          className={STISTDJson[first]?.heading && "complete"}
                        >
                          <h4>
                            {STISTDJson[first]?.menu
                              ? ""
                              : STISTDJson[first]?.heading}
                          </h4>
                          <p>{STISTDJson[first]?.subHeading}</p>
                          <p>{STISTDJson[first]?.text}</p>
                        </Modal.Body>
                      )}

                      <div className="btnnext">
                        {STISTDJson[first]?.heading ? (
                          <button
                            className={STISTDJson[first]?.menu ? "" : "btnFix"}
                            onClick={() => handleHeadingModal()}
                          >
                            {STISTDJson[first]?.menu
                              ? "Got it"
                              : "COMPLETE CONSULT"}
                            {loading && !STISTDJson[first]?.menu && <Loader />}
                          </button>
                        ) : STISTDJson[first]?.id === 6 ? (
                          <div className="btnnext">
                            <a href="https://www.frenchiemd.com/">
                              <button>ok</button>
                            </a>
                          </div>
                        ) : (
                          <button onClick={() => setid(STISTDJson[first].next)}>
                            Got it
                          </button>
                        )}
                      </div>
                    </Modal>
                  ) : (
                    <div class="d-flex">
                      {/* cm picker */}
                      <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
                        <DropdownToggle className="list1 w-100" caret>
                          {centi !== "CM" ? centi + "cm" : centi}
                        </DropdownToggle>

                        <DropdownMenu>
                          {cmDropDpwn.map((v) => {
                            return (
                              <DropdownItem
                                className="item"
                                value={v}
                                onClick={(e) => {
                                  addnew(e.target.value);
                                  setCenti(e.target.value);
                                }}
                              >
                                {v}cm
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </>

              {STISTDJson[first]?.key === "model" ? (
                ""
              ) : (
                // next-prev buttons
                <div className={"btnnext align "}>
                  {
                    <button
                      onClick={() => prevnew()}
                      style={{
                        cursor:
                          userData?.questionTypes?.length > 0 && first <= 4
                            ? "no-drop"
                            : "pointer",
                      }}
                      className="prev me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-arrow-left-long"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                        />
                      </svg>
                      &nbsp;Previous
                    </button>
                  }
                  <button onClick={() => nextnew()} className=" ms-2">
                    Next&nbsp;
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
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StiStdFlow;
