import React, { useState } from "react";
import { thrushBaceterialVaginosisData, codition } from "../../data/jsonData";
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
let thrushBaceterialVaginosisjSON = [...thrushBaceterialVaginosisData];

const ThrushBaceterialVaginosisFlow = () => {
  // hook and local storage
  const userData = JSON.parse(localStorage.getItem("logindata"));
  const navigate = useNavigate();
  const location = useLocation();

  //   state
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(
    userData?.questionTypes?.length > 0 ? 6 : 0
  );
  //
  const [count, setcount] = useState(0);
  const [isNoNote, setisNoNote] = useState(false);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [modalShow, setModalShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState(userData?.questionTypes?.length > 0 ? 7 : 1);
  const [centi, setCenti] = useState("CM");

  //   effect
  useEffect(() => {
    window.scroll(0, 0);
    let uni = thrushBaceterialVaginosisjSON.findIndex((item) => item.id === id);

    setFirst(uni);
    if (uni.key === "model") {
      setModalShow(true);
    }
  }, [id]);

  useEffect(() => {
    if (userData?.questionTypes?.length > 0) {
      setid(7);
    }
  }, []);

  //   create hight data in cm
  var cmDropDpwn = [];
  for (var i = 130; i <= 250; i++) {
    cmDropDpwn.push(i);
  }

  //   event handler
  // handle inputs values
  const addnew = (anwser, key) => {
    // debugger
    if (key == "check") {
      const foundObject = thrushBaceterialVaginosisjSON[first].answer.find(
        (item) => item.noneflag === true
      );
      const index1 = thrushBaceterialVaginosisjSON[first].useranwser.indexOf(
        foundObject?.answerName
      );

      if (index1 !== -1) {
        thrushBaceterialVaginosisjSON[first].useranwser.splice(index1, 1);
      }
      const index =
        thrushBaceterialVaginosisjSON[first].useranwser.indexOf(anwser);

      if (index === -1) {
        // String not found, add it
        thrushBaceterialVaginosisjSON[first].useranwser.push(anwser);
      } else {
        // String found, remove it
        thrushBaceterialVaginosisjSON[first].useranwser.splice(index, 1);
      }
    } else {
      thrushBaceterialVaginosisjSON[first].useranwser = anwser;
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
      thrushBaceterialVaginosisjSON[first - 1].isCheckbox &&
      thrushBaceterialVaginosisjSON[first - 1].useranwser === "No Notes"
    ) {
      setisNoNote(true);
      thrushBaceterialVaginosisjSON[first].useranwser = "No Notes";
    }
    if (thrushBaceterialVaginosisjSON[first]?.doubleflow) {
      let uni = thrushBaceterialVaginosisjSON.findIndex(
        (item) => item.id === thrushBaceterialVaginosisjSON[first].retrunid
      );
      let data = thrushBaceterialVaginosisjSON[uni];
      let foundObject = thrushBaceterialVaginosisjSON[uni].answer.find(
        (item) =>
          item.answerName === thrushBaceterialVaginosisjSON[uni].useranwser
      );
      if (!foundObject) {
        const filteredObjects = thrushBaceterialVaginosisjSON[
          uni
        ].answer.filter((obj) =>
          thrushBaceterialVaginosisjSON[uni].useranwser.includes(obj.answerName)
        );
        setid(filteredObjects[0].prev);
      } else {
        setid(foundObject.prev);
      }
    } else {
      setid(thrushBaceterialVaginosisjSON[first].prev);
    }
  };

  // remove double flow answer and unanswer
  const handleResetAnswerOfdouble = () => {
    let findindex = thrushBaceterialVaginosisjSON.findIndex(
      (item) => item.id === thrushBaceterialVaginosisjSON[first].retrunid
    );
    const findAnswer = thrushBaceterialVaginosisjSON[findindex];
    let tempobj = [];
    if (findAnswer.useranwser === "No" && findAnswer.isAnswerNo) {
      setisNoNote(false);
      thrushBaceterialVaginosisjSON?.forEach((element) => {
        if (findAnswer.noAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    } else if (findAnswer.useranwser === "Yes" && findAnswer.isAnswerYes) {
      thrushBaceterialVaginosisjSON?.forEach((element) => {
        if (findAnswer.yesAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    }
    return tempobj?.length ? tempobj : thrushBaceterialVaginosisjSON;
  };
  // handle next screen
  const nextnew = async () => {
    // logic to remove next
    if (thrushBaceterialVaginosisjSON[first].isnoAnserRemove) {
      const resetAnswerOfdouble = handleResetAnswerOfdouble();
      thrushBaceterialVaginosisjSON = [...resetAnswerOfdouble];
    }

    // if flow done
    if (thrushBaceterialVaginosisjSON[first].next == "done") {
      setLoading(true);

      let data = calldata();
      let getQuestionsData = JSON.parse(localStorage.getItem("answer"));
      const bloodTestAnswer = thrushBaceterialVaginosisjSON?.find(
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
        questionType: "Thrush / Bacterial Vaginosis",
        paymentAmount: codition[3]?.price || 80,
        isSTIpayment: localStorage.getItem("isPay") ? true : false,
      };
      await ApiPost("patient/patient_question", body)
        .then((response) => {
          const questionTypes = codition.find(
            (res) => res.label === "Thrush / Bacterial Vaginosis"
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
          return console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (thrushBaceterialVaginosisjSON[first].isCheckbox && isNoNote) {
      thrushBaceterialVaginosisjSON[first].useranwser = "No Notes";
      setisNoNote(false);
    }
    if (
      !thrushBaceterialVaginosisjSON[first].useranwser &&
      thrushBaceterialVaginosisjSON[first].key !== "date"
    ) {
      return ErrorToast("Please attempt this question");
    }
    if (
      thrushBaceterialVaginosisjSON[first].useranwser?.length == 0 &&
      thrushBaceterialVaginosisjSON[first].key === "check"
    ) {
      return ErrorToast("Please attempt this question");
    }
    if (thrushBaceterialVaginosisjSON[first].key === "date") {
      let newData = `${year}-${Number(month) + 1}-${day}`;
      if (!year && !month && !day) {
        return ErrorToast("Please attempt this question");
      } else {
        var isAdult = isEighteenYearsOld(newData);

        if (isAdult) {
          await addnew(`${day}-${Number(month) + 1}-${year}`);
          setid(thrushBaceterialVaginosisjSON[first].next);
        } else {
          setid(thrushBaceterialVaginosisjSON[first].notvalid);
        }
      }
    } else {
      if (thrushBaceterialVaginosisjSON[first].nextsub) {
        const foundObject = thrushBaceterialVaginosisjSON[first].answer.find(
          (item) =>
            item.answerName === thrushBaceterialVaginosisjSON[first].useranwser
        );
        if (!foundObject) {
          const filteredObjects = thrushBaceterialVaginosisjSON[
            first
          ].answer.filter((obj) =>
            thrushBaceterialVaginosisjSON[first].useranwser.includes(
              obj.answerName
            )
          );
          setid(filteredObjects[0].next);
        } else {
          setid(foundObject.next);
        }
      } else {
        setid(thrushBaceterialVaginosisjSON[first].next);
      }
    }
  };

  // remove modal and not attempt question object fron json

  const calldata = () => {
    let removemodel;
    if (userData?.questionTypes?.length > 0) {
      let slicemain = thrushBaceterialVaginosisjSON.slice(6);
      removemodel = slicemain.filter((obj) => obj.key !== "model");
    } else {
      removemodel = thrushBaceterialVaginosisjSON.filter(
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
    if (thrushBaceterialVaginosisjSON[first]?.menu) {
      navigate(
        location?.state?.isFirstTime === false
          ? "/ManageTreatment"
          : "/condition"
      );
    } else if (thrushBaceterialVaginosisjSON[first]?.id === 27) {
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
                thrushBaceterialVaginosisjSON[first]?.ui === 1
                  ? "d-flex flex-column justify-contant-center questionBody"
                  : "conditioninfo"
              }`}
            >
              <>
                <div className="conditionsub">
                  <h3 className="what_your_sex_head">
                    {thrushBaceterialVaginosisjSON[first]?.question}
                  </h3>
                  <div className="flow-sub-heading-wrapper">
                    <h5 className="flow-heading">
                      {thrushBaceterialVaginosisjSON[first]?.subQuestion
                        ? thrushBaceterialVaginosisjSON[first]?.subQuestion
                        : ""}
                    </h5>
                  </div>
                </div>
                <div className="checktab">
                  {thrushBaceterialVaginosisjSON[first]?.key === "option" ? ( //inputs as options
                    <div
                      className={`selectgender ${
                        thrushBaceterialVaginosisjSON[first]?.answer.length >
                          9 && "optionSet"
                      }`}
                    >
                      {thrushBaceterialVaginosisjSON[first]?.answer.map(
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
                                    thrushBaceterialVaginosisjSON[first]
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
                  ) : thrushBaceterialVaginosisjSON[first]?.key === "check" ? ( //input as checkbox
                    <div className="selectgender">
                      {thrushBaceterialVaginosisjSON[first]?.answer.map(
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
                                    thrushBaceterialVaginosisjSON[first]
                                      .useranwser &&
                                    thrushBaceterialVaginosisjSON[
                                      first
                                    ].useranwser.includes(ans.answerName)
                                  }
                                  onChange={(e) => {
                                    if (ans.noneflag) {
                                      thrushBaceterialVaginosisjSON[
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
                              {thrushBaceterialVaginosisjSON[first]?.answer[i]
                                ?.isFlag &&
                                thrushBaceterialVaginosisjSON[first]
                                  .useranwser &&
                                thrushBaceterialVaginosisjSON[
                                  first
                                ].useranwser.includes(ans.answerName) && (
                                  <div>
                                    <div>
                                      <textarea
                                        defaultValue={
                                          thrushBaceterialVaginosisjSON[first]
                                            .userotheranwser
                                        }
                                        checked={
                                          thrushBaceterialVaginosisjSON[first]
                                            .useranwser &&
                                          thrushBaceterialVaginosisjSON[
                                            first
                                          ].useranwser.includes(ans.answerName)
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          thrushBaceterialVaginosisjSON[
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
                  ) : thrushBaceterialVaginosisjSON[first]?.key === "date" ? ( //input as date picker
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
                            // setAnswer(year);
                            // setChange(true);
                            setYear(year);
                          }}
                          id={"year"}
                          name={"year"}
                          classes={"list1 px-3 py-2 mx-2"}
                          optionClasses={""}
                        />
                      </div>
                    </div>
                  ) : thrushBaceterialVaginosisjSON[first]?.key ===
                    "textarea" ? ( //input as text area
                    <div className="checktab">
                      <div className="selectgender exercise">
                        <textarea
                          value={
                            thrushBaceterialVaginosisjSON[first].useranwser
                          }
                          onChange={(e) => {
                            if (
                              thrushBaceterialVaginosisjSON[first].isCheckbox &&
                              isNoNote
                            ) {
                              thrushBaceterialVaginosisjSON[first].useranwser =
                                "";
                            } else {
                              thrushBaceterialVaginosisjSON[first].useranwser =
                                e.target.value;
                            }

                            setcount(count + 1);
                          }}
                        ></textarea>
                        {(thrushBaceterialVaginosisjSON[first]?.question ===
                          "Is there anything else you would like to say to the Doctor?" ||
                          thrushBaceterialVaginosisjSON[first]?.question ===
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
                  ) : thrushBaceterialVaginosisjSON[first]?.key === "model" ? ( //qsn as modal
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
                          thrushBaceterialVaginosisjSON[first]?.heading &&
                          "complete"
                        }
                      >
                        <h4>
                          {thrushBaceterialVaginosisjSON[first]?.menu
                            ? ""
                            : thrushBaceterialVaginosisjSON[first]?.heading}
                        </h4>
                        <p>
                          {thrushBaceterialVaginosisjSON[first]?.subHeading}
                        </p>
                        <p>{thrushBaceterialVaginosisjSON[first]?.text}</p>
                      </Modal.Body>

                      <div className="btnnext">
                        {thrushBaceterialVaginosisjSON[first]?.heading ? (
                          thrushBaceterialVaginosisjSON[first]?.isTwoButton ? (
                            <div className="justify-content-between">
                              <button
                                style={{ maxWidth: "100px" }}
                                className={
                                  thrushBaceterialVaginosisjSON[first]?.menu
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
                                  thrushBaceterialVaginosisjSON[first]?.menu
                                    ? ""
                                    : "btnFix me-2 px-4"
                                }
                                onClick={() =>
                                  navigate(
                                    location?.state?.isFirstTime === false
                                      ? "/ManageTreatment"
                                      : "/condition"
                                  )
                                }
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              className={
                                thrushBaceterialVaginosisjSON[first]?.menu
                                  ? ""
                                  : "btnFix"
                              }
                              onClick={() => handleHeadingModal()}
                            >
                              {thrushBaceterialVaginosisjSON[first]?.menu
                                ? "Got it"
                                : "COMPLETE CONSULT"}
                            </button>
                          )
                        ) : thrushBaceterialVaginosisjSON[first]
                            ?.isTwoButton ? (
                          <div className="justify-content-between">
                            <button
                              style={{ maxWidth: "100px" }}
                              className={
                                thrushBaceterialVaginosisjSON[first]?.menu
                                  ? ""
                                  : "btnFix me-2 px-4"
                              }
                              onClick={() => {
                                localStorage.setItem("isPay", true);
                                localStorage.setItem("pathologyTestCharge", 50);
                                setid(
                                  thrushBaceterialVaginosisjSON[first].next
                                );
                              }}
                            >
                              Yes
                            </button>
                            <button
                              style={{ maxWidth: "100px" }}
                              className={
                                thrushBaceterialVaginosisjSON[first]?.menu
                                  ? ""
                                  : "btnFix me-2 px-4"
                              }
                              onClick={() => {
                                localStorage.removeItem("isPay");
                                localStorage.removeItem("pathologyTestCharge");
                                setid(
                                  thrushBaceterialVaginosisjSON[first].next
                                );
                              }}
                            >
                              No
                            </button>
                          </div>
                        ) : thrushBaceterialVaginosisjSON[first]?.id === 6 ? (
                          <div className="btnnext">
                            <a href="https://www.frenchiemd.com/">
                              <button>ok</button>
                            </a>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setid(thrushBaceterialVaginosisjSON[first].next)
                            }
                          >
                            Got it
                          </button>
                        )}
                      </div>
                    </Modal>
                  ) : (
                    // height pikcer
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

              {thrushBaceterialVaginosisjSON[first]?.key === "model" ? (
                ""
              ) : (
                // next prev button
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

export default ThrushBaceterialVaginosisFlow;
