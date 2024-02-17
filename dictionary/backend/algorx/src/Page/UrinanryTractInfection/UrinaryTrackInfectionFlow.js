import React, { useState } from "react";
import { codition, urinanryTractInfectionData } from "../../data/jsonData";
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
import Loader from "../../Component/Loader/Loader";

let urinanryTractInfectionJSON = [...urinanryTractInfectionData];
const UrinaryTrackInfectionFlow = () => {
  const userData = JSON.parse(localStorage.getItem("logindata"));
  const navigate = useNavigate();
  const location = useLocation();

  //   state
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(
    userData?.questionTypes?.length > 0 ? 6 : 0
  );
  const [count, setcount] = useState(0);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [modalShow, setModalShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState(userData?.questionTypes?.length > 0 ? 7 : 1);
  const [centi, setCenti] = useState("CM");

  const [isNoNote, setisNoNote] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
    let uni = urinanryTractInfectionJSON.findIndex((item) => item.id === id);
    setFirst(uni);
  }, [id]);

  useEffect(() => {
    if (userData?.questionTypes?.length > 0) {
      setid(7);
    }
  }, []);

  //   loops and vars
  var cmDropDpwn = [];
  for (var i = 130; i <= 250; i++) {
    cmDropDpwn.push(i);
  }

  //   event handler
  // handle inputs values
  const addnew = (anwser, key) => {
    if (key == "check") {
      const foundObject = urinanryTractInfectionJSON[first].answer.find(
        (item) => item.noneflag === true
      );
      const index1 = urinanryTractInfectionJSON[first].useranwser.indexOf(
        foundObject?.answerName
      );

      if (index1 !== -1) {
        urinanryTractInfectionJSON[first].useranwser.splice(index1, 1);
      }
      const index =
        urinanryTractInfectionJSON[first].useranwser.indexOf(anwser);

      if (index === -1) {
        // String not found, add it
        urinanryTractInfectionJSON[first].useranwser.push(anwser);
      } else {
        // String found, remove it
        urinanryTractInfectionJSON[first].useranwser.splice(index, 1);
      }
    } else {
      urinanryTractInfectionJSON[first].useranwser = anwser;
    }
    setcount(count + 1);
  };

  // handle prev screen
  const prevnew = () => {
    // debugger
    if (
      urinanryTractInfectionJSON[first - 1]?.isCheckbox &&
      urinanryTractInfectionJSON[first - 1].useranwser === "No Notes"
    ) {
      setisNoNote(true);
      urinanryTractInfectionJSON[first].useranwser = "No Notes";
    }
    if (first === 0 || (first === 6 && userData?.questionTypes?.length > 0)) {
      navigate(
        location?.state?.isFirstTime === false
          ? "/ManageTreatment"
          : "/condition"
      );
    }
    if (urinanryTractInfectionJSON[first]?.doubleflow) {
      let uni = urinanryTractInfectionJSON.findIndex(
        (item) => item.id === urinanryTractInfectionJSON[first].retrunid
      );
      let data = urinanryTractInfectionJSON[uni];
      let foundObject = urinanryTractInfectionJSON[uni].answer.find(
        (item) => item.answerName === urinanryTractInfectionJSON[uni].useranwser
      );
      if (!foundObject) {
        const filteredObjects = urinanryTractInfectionJSON[uni].answer.filter(
          (obj) =>
            urinanryTractInfectionJSON[uni].useranwser.includes(obj.answerName)
        );
        setid(filteredObjects[0].prev);
      } else {
        setid(foundObject.prev);
      }
    } else {
      setid(urinanryTractInfectionJSON[first].prev);
    }
  };

  // remove double flow answer and unanswer
  const handleResetAnswerOfdouble = () => {
    // debugger
    let findindex = urinanryTractInfectionJSON.findIndex(
      (item) => item.id === urinanryTractInfectionJSON[first].retrunid
    );
    const findAnswer = urinanryTractInfectionJSON[findindex];
    let tempobj = [];
    if (findAnswer.useranwser === "No" && findAnswer.isAnswerNo) {
      setisNoNote(false);
      urinanryTractInfectionJSON?.forEach((element) => {
        if (findAnswer.noAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    } else if (findAnswer.useranwser === "Yes" && findAnswer.isAnswerYes) {
      urinanryTractInfectionJSON?.forEach((element) => {
        if (findAnswer.yesAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    }
    return tempobj?.length ? tempobj : urinanryTractInfectionJSON;
  };

  // handle next screen
  const nextnew = async () => {
    // debugger

    // logic to remove next
    if (urinanryTractInfectionJSON[first]?.isnoAnserRemove) {
      const resetAnswerOfdouble = handleResetAnswerOfdouble();
      urinanryTractInfectionJSON = [...resetAnswerOfdouble];
    }

    // if flow done
    if (urinanryTractInfectionJSON[first]?.next == "done") {
      setLoading(true);

      let data = calldata();
      let getQuestionsData = JSON.parse(localStorage.getItem("answer"));
      const bloodTestAnswer = urinanryTractInfectionJSON?.find(
        (item) =>
          item?.question ===
          "Would you also like to screen for STI’s with this consult?"
      );
      if (bloodTestAnswer?.useranwser === "No") {
        localStorage.removeItem("isPay");
        localStorage.removeItem("pathologyTestCharge");
      }
      const body = {
        questions: getQuestionsData ? [...getQuestionsData, ...data] : data,
        questionType: "Urinary Tract Infection",
        paymentAmount: codition[4]?.price || 80,
        isSTIpayment: localStorage.getItem("isPay") ? true : false,
      };

      await ApiPost("patient/patient_question", body)
        .then((response) => {
          const questionTypes = codition.find(
            (res) => res.label === "Urinary Tract Infection"
          );
          localStorage.setItem(
            "questionTypes",
            JSON.stringify({
              ...questionTypes,
              questionId: response?.data?.data?.questionId,
              consultation_id: response?.data?.data?.consultation_id,
            })
          );

          navigate(
            location?.state?.isFirstTime === false
              ? "/payment"
              : "/paymentSummary"
          );
        })
        .catch((err) => {
          navigate("/condition");
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
    if (urinanryTractInfectionJSON[first]?.isCheckbox && isNoNote) {
      urinanryTractInfectionJSON[first].useranwser = "No Notes";
      setisNoNote(false);
    }

    if (
      !urinanryTractInfectionJSON[first]?.useranwser &&
      urinanryTractInfectionJSON[first]?.key !== "date"
    ) {
      return ErrorToast("Please attempt this question");
    }
    if (
      urinanryTractInfectionJSON[first]?.useranwser?.length == 0 &&
      urinanryTractInfectionJSON[first]?.key === "check"
    ) {
      return ErrorToast("Please attempt this question");
    }
    if (urinanryTractInfectionJSON[first]?.key === "date") {
      let newData = `${year}-${Number(month) + 1}-${day}`;
      if (!year && !month && !day) {
        return ErrorToast("Please attempt this question");
      } else {
        var isAdult = isEighteenYearsOld(newData);

        if (isAdult) {
          await addnew(`${day}-${Number(month) + 1}-${year}`);
          setid(urinanryTractInfectionJSON[first].next);
        } else {
          setid(urinanryTractInfectionJSON[first].notvalid);
        }
      }
    } else {
      if (urinanryTractInfectionJSON[first].nextsub) {
        const foundObject = urinanryTractInfectionJSON[first].answer.find(
          (item) =>
            item.answerName === urinanryTractInfectionJSON[first].useranwser
        );
        if (!foundObject) {
          const filteredObjects = urinanryTractInfectionJSON[
            first
          ].answer.filter((obj) =>
            urinanryTractInfectionJSON[first].useranwser.includes(
              obj.answerName
            )
          );
          setid(filteredObjects[0].next);
        } else {
          setid(foundObject.next);
        }
      } else {
        setid(urinanryTractInfectionJSON[first].next);
      }
    }
  };

  // remove modal and not attempt question object fron json

  const calldata = () => {
    let removemodel;
    if (userData?.questionTypes?.length > 0) {
      let slicemain = urinanryTractInfectionJSON.slice(6);
      removemodel = slicemain.filter((obj) => obj.key !== "model");
    } else {
      removemodel = urinanryTractInfectionJSON.filter(
        (obj) => obj.key !== "model"
      );
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
    return removeUnAnswer.map((obj) => ({
      [`${id}`]: Math.random().toString(16).slice(2),
      [`${que}`]: obj["question"],
      [`${ans}`]: obj["useranwser"],
      [`${oth}`]: obj["otherAns"],
    }));
  };

  //   handle modal
  const handleHeadingModal = () => {
    if (urinanryTractInfectionJSON[first]?.menu) {
      navigate(
        location?.state?.isFirstTime === false
          ? "/ManageTreatment"
          : "/condition"
      );
    } else if (urinanryTractInfectionJSON[first]?.id === 27) {
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
                urinanryTractInfectionJSON[first]?.ui === 1
                  ? "d-flex flex-column justify-contant-center questionBody"
                  : "conditioninfo"
              }`}
            >
              <>
                <div className="conditionsub">
                  <h3 className="what_your_sex_head">
                    {urinanryTractInfectionJSON[first]?.question}
                  </h3>
                  <div className="flow-sub-heading-wrapper">
                    <h5 className="flow-heading">
                      {urinanryTractInfectionJSON[first]?.subQuestion
                        ? urinanryTractInfectionJSON[first]?.subQuestion
                        : ""}
                    </h5>
                  </div>
                </div>
                <div className="checktab">
                  {urinanryTractInfectionJSON[first]?.key === "option" ? ( //inputs as options
                    <div
                      className={`selectgender ${
                        urinanryTractInfectionJSON[first]?.answer.length > 9 &&
                        "optionSet"
                      }`}
                    >
                      {urinanryTractInfectionJSON[first]?.answer.map(
                        (ans, i) => {
                          return (
                            <>
                              <div className="male">
                                <input
                                  type="radio"
                                  id={i}
                                  name="age"
                                  value={ans.answerName}
                                  checked={
                                    urinanryTractInfectionJSON[first]
                                      .useranwser == ans.answerName
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
                        }
                      )}
                    </div>
                  ) : urinanryTractInfectionJSON[first]?.key === "check" ? ( //input as checkbox
                    <div className="selectgender">
                      {urinanryTractInfectionJSON[first]?.answer.map(
                        (ans, i) => {
                          return (
                            <>
                              <div className="male">
                                <input
                                  type={"checkbox"}
                                  id={i}
                                  name="age"
                                  value={ans.answerName}
                                  checked={
                                    urinanryTractInfectionJSON[first]
                                      .useranwser &&
                                    urinanryTractInfectionJSON[
                                      first
                                    ].useranwser.includes(ans.answerName)
                                  }
                                  onChange={(e) => {
                                    if (ans.noneflag) {
                                      urinanryTractInfectionJSON[
                                        first
                                      ].useranwser = [e.target.value];
                                      setcount(count + 1);
                                    } else {
                                      addnew(e.target.value, "check");
                                    }
                                  }}
                                  style={{ width: "0px", padding: "0px" }}
                                />
                                <label for={i}>{ans.answerName}</label>
                              </div>
                              {urinanryTractInfectionJSON[first]?.answer[i]
                                ?.isFlag &&
                                urinanryTractInfectionJSON[first].useranwser &&
                                urinanryTractInfectionJSON[
                                  first
                                ].useranwser.includes(ans.answerName) && (
                                  <div>
                                    <div>
                                      <textarea
                                        defaultValue={
                                          urinanryTractInfectionJSON[first]
                                            .userotheranwser
                                        }
                                        checked={
                                          urinanryTractInfectionJSON[first]
                                            .useranwser &&
                                          urinanryTractInfectionJSON[
                                            first
                                          ].useranwser.includes(ans.answerName)
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          urinanryTractInfectionJSON[
                                            first
                                          ].userotheranwser = e.target.value;
                                          setcount(count + 1);
                                        }}
                                      ></textarea>
                                    </div>
                                  </div>
                                )}
                            </>
                          );
                        }
                      )}
                    </div>
                  ) : urinanryTractInfectionJSON[first]?.key === "date" ? ( //input as date picker
                    <div className="dateDrop">
                      <div className=" ">
                        <DayPicker
                          defaultValue={"DD"}
                          year={year} // mandatory
                          month={month} // mandatory
                          endYearGiven // mandatory if end={} is given in YearPicker
                          value={day} // mandatory
                          onChange={(e) => {
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
                          // disabled
                        />

                        <YearPicker
                          defaultValue={"YYYY"}
                          reverse // default is ASCENDING
                          value={year} // mandatory
                          onChange={(year) => {
                            // setAnswer(year);
                            // setChange(true);
                            setYear(year);
                          }}
                          id={"year"}
                          name={"year"}
                          classes={"list1 px-3 py-2 mx-2"}
                          optionClasses={""}
                          // disabled
                        />
                      </div>
                    </div>
                  ) : urinanryTractInfectionJSON[first]?.key === "textarea" ? ( //input as text area
                    <div className="checktab">
                      <div className="selectgender exercise">
                        <textarea
                          value={urinanryTractInfectionJSON[first].useranwser}
                          onChange={(e) => {
                            if (
                              urinanryTractInfectionJSON[first]?.isCheckbox &&
                              isNoNote
                            ) {
                              urinanryTractInfectionJSON[first].useranwser = "";
                            } else {
                              urinanryTractInfectionJSON[first].useranwser =
                                e.target.value;
                            }

                            setcount(count + 1);
                          }}
                        ></textarea>
                        {(urinanryTractInfectionJSON[first]?.question ===
                          "Is there anything else you would like to say to the Doctor?" ||
                          urinanryTractInfectionJSON[first]?.question ===
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
                  ) : urinanryTractInfectionJSON[first]?.key === "model" ? ( //qsn as modal
                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      backdrop="static"
                      keyboard={false}
                      show={modalShow}
                      onHide={() => setModalShow(!modalShow)}
                    >
                      <Modal.Body
                        className={
                          urinanryTractInfectionJSON[first]?.heading &&
                          "complete"
                        }
                      >
                        <h4>
                          {urinanryTractInfectionJSON[first]?.menu
                            ? ""
                            : urinanryTractInfectionJSON[first]?.heading}
                        </h4>
                        <p>{urinanryTractInfectionJSON[first]?.subHeading}</p>
                        <p>{urinanryTractInfectionJSON[first]?.text}</p>
                      </Modal.Body>
                      {/*  )}  */}

                      <div className="btnnext">
                        {urinanryTractInfectionJSON[first]?.heading ? (
                          urinanryTractInfectionJSON[first]?.isTwoButton ? (
                            <div className="justify-content-between">
                              <button
                                style={{ maxWidth: "100px" }}
                                className={
                                  urinanryTractInfectionJSON[first]?.menu
                                    ? ""
                                    : "btnFix me-2 px-4"
                                }
                                onClick={() => navigate("/STISTD")}
                              >
                                Yes
                              </button>
                              <button
                                style={{ maxWidth: "100px" }}
                                className={
                                  urinanryTractInfectionJSON[first]?.menu
                                    ? ""
                                    : "btnFix me-2 px-4"
                                }
                                onClick={() =>
                                  setid(urinanryTractInfectionJSON[first].next)
                                }
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              className={
                                urinanryTractInfectionJSON[first]?.menu
                                  ? ""
                                  : "btnFix"
                              }
                              onClick={() => handleHeadingModal()}
                            >
                              {urinanryTractInfectionJSON[first]?.menu
                                ? "Got it"
                                : "COMPLETE CONSULT"}
                            </button>
                          )
                        ) : urinanryTractInfectionJSON[first]?.isTwoButton ? (
                          <div className="justify-content-between">
                            <button
                              style={{ maxWidth: "100px" }}
                              className={
                                urinanryTractInfectionJSON[first]?.menu
                                  ? ""
                                  : "btnFix me-2 px-4"
                              }
                              onClick={() => {
                                localStorage.setItem("isPay", true);
                                localStorage.setItem("pathologyTestCharge", 50);

                                setid(urinanryTractInfectionJSON[first].next);
                              }}
                            >
                              Yes
                            </button>
                            <button
                              style={{ maxWidth: "100px" }}
                              className={
                                urinanryTractInfectionJSON[first]?.menu
                                  ? ""
                                  : "btnFix me-2 px-4"
                              }
                              onClick={() => {
                                localStorage.removeItem("isPay");
                                localStorage.removeItem("pathologyTestCharge");

                                setid(urinanryTractInfectionJSON[first].next);
                              }}
                            >
                              No
                            </button>
                          </div>
                        ) : urinanryTractInfectionJSON[first]?.id === 6 ? (
                          <div className="btnnext">
                            <a href="https://www.frenchiemd.com/">
                              <button>ok</button>
                            </a>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setid(urinanryTractInfectionJSON[first].next)
                            }
                          >
                            Got it
                          </button>
                        )}
                      </div>
                    </Modal>
                  ) : (
                    // hight picker in cm
                    <div class="d-flex">
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

              {urinanryTractInfectionJSON[first]?.key === "model" ? (
                ""
              ) : (
                // next prev buttons
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

export default UrinaryTrackInfectionFlow;
