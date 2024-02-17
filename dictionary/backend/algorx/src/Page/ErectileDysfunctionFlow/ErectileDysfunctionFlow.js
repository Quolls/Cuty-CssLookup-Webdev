import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/logo.png";
import { codition, erectileDysfunctionData } from "../../data/jsonData";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import { Modal } from "react-bootstrap";
import { ErrorToast } from "../../Component/Toaster/Toaster";
import _ from "underscore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { ApiPost } from "../../helpers/API/API_data";
import Loader from "../../Component/Loader/Loader";

// create cm data
var cmDropDpwn = [];
for (var i = 130; i <= 250; i++) {
  cmDropDpwn.push(i);
}

let erectileDysfunction = [...erectileDysfunctionData];
const ErectileDysfunction = () => {
  const userData = JSON.parse(localStorage.getItem("logindata"));
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [modalShow, setModalShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState(0);
  const [id, setid] = useState(1);
  const [centi, setCenti] = useState("CM");
  const [count, setcount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNoNote, setisNoNote] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // set current screen anser
  useEffect(() => {
    window.scroll(0, 0);
    let uni = erectileDysfunction.findIndex((item) => item.id === id);
    setFirst(uni);
  }, [id]);

  useEffect(() => {
    if (userData?.questionTypes?.length > 0) {
      setid(7);
    }
  }, []);

  // remove modal and not attempt question object fron json
  const calldata = () => {
    let removemodel;
    if (userData?.questionTypes?.length > 0) {
      let slicemain = erectileDysfunction.slice(6);
      removemodel = slicemain.filter((obj) => obj.key !== "model");
    } else {
      removemodel = erectileDysfunction.filter((obj) => obj.key !== "model");
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

  // handle inputs values
  const addnew = (anwser, key) => {
    if (key == "check") {
      const foundObject = erectileDysfunction[first].answer.find(
        (item) => item.noneflag === true
      );
      const index1 = erectileDysfunction[first].useranwser.indexOf(
        foundObject?.answerName
      );

      if (index1 !== -1) {
        erectileDysfunction[first].useranwser.splice(index1, 1);
      }
      const index = erectileDysfunction[first].useranwser.indexOf(anwser);

      if (index === -1) {
        // String not found, add it
        erectileDysfunction[first].useranwser.push(anwser);
      } else {
        // String found, remove it
        erectileDysfunction[first].useranwser.splice(index, 1);
      }
    } else {
      erectileDysfunction[first].useranwser = anwser;
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
      erectileDysfunction[first - 1].isCheckbox &&
      erectileDysfunction[first - 1].useranwser === "No Notes"
    ) {
      setisNoNote(true);
      erectileDysfunction[first].useranwser = "No Notes";
    }
    if (erectileDysfunction[first].doubleflow) {
      let uni = erectileDysfunction.findIndex(
        (item) => item.id === erectileDysfunction[first].retrunid
      );
      let foundObject = erectileDysfunction[uni].answer.find(
        (item) => item.answerName === erectileDysfunction[uni].useranwser
      );
      if (!foundObject) {
        const filteredObjects = erectileDysfunction[uni].answer.filter((obj) =>
          erectileDysfunction[uni].useranwser.includes(obj.answerName)
        );

        setid(filteredObjects[0].prev);
      } else {
        setid(foundObject.prev);
      }
    } else {
      setid(erectileDysfunction[first].prev);
    }
  };

  // remove double flow answer and unanswer
  const handleResetAnswerOfdouble = () => {
    // debugger
    let findindex = erectileDysfunction.findIndex(
      (item) => item.id === erectileDysfunction[first].retrunid
    );
    const findAnswer = erectileDysfunction[findindex];
    let tempobj = [];
    if (
      (findAnswer.useranwser === "No" ||
        findAnswer.useranwser === "No, I don't use drugs") &&
      findAnswer.isAnswerNo
    ) {
      setisNoNote(false);
      erectileDysfunction?.forEach((element) => {
        if (findAnswer.noAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    } else if (findAnswer.useranwser === "Yes" && findAnswer.isAnswerYes) {
      erectileDysfunction?.forEach((element) => {
        if (findAnswer.yesAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    } else if (
      findAnswer?.key === "check" &&
      findAnswer?.useranwser?.includes("None of the above")
    ) {
      erectileDysfunction?.forEach((element) => {
        if (findAnswer.noAnserRemoveIds.includes(element.id)) {
          tempobj.push({ ...element, useranwser: [] });
        } else {
          tempobj.push(element);
        }
      });
    }
    return tempobj?.length ? tempobj : erectileDysfunction;
  };

  // handle next screen
  const nextnew = async () => {
    // debugger
    // logic to remove next
    if (erectileDysfunction[first].isnoAnserRemove) {
      const resetAnswerOfdouble = handleResetAnswerOfdouble();
      erectileDysfunction = [...resetAnswerOfdouble];
    }

    // when last qsn of flow submit all answer and navigate to payment screen
    if (erectileDysfunction[first].next == "done") {
      setLoading(true);
      let data = calldata();
      let getQuestionsData = JSON.parse(localStorage.getItem("answer"));

      const body = {
        questions: getQuestionsData ? [...getQuestionsData, ...data] : data,
        questionType: "Erectile Dysfunction",
        paymentAmount: codition[0]?.price || 25,
      };
      await ApiPost("patient/patient_question", body)
        .then((response) => {
          const questionTypes = codition.find(
            (res) => res.label === "Erectile Dysfunction"
          );
          localStorage.setItem(
            "questionTypes",
            JSON.stringify({
              ...questionTypes,
              questionId: response?.data?.data?.questionId,
              consultation_id: response?.data?.data?.consultation_id,
            })
          );
          localStorage.removeItem("isPay");
          localStorage.removeItem("pathologyTestCharge");
          navigate(
            location?.state?.isFirstTime === false
              ? "/payment"
              : "/paymentSummary"
          );
        })
        .catch((err) => {
          setLoading(false);
          navigate(
            location?.state?.isFirstTime === false
              ? "/ManageTreatment"
              : "/condition"
          );
          return console.log(err);
        });
    }

    if (erectileDysfunction[first].isCheckbox && isNoNote) {
      erectileDysfunction[first].useranwser = "No Notes";
      setisNoNote(false);
    }
    if (
      (!erectileDysfunction[first].useranwser ||
        !erectileDysfunction[first].useranwser.length) &&
      erectileDysfunction[first].key !== "date"
    ) {
      return ErrorToast("Please attempt this question");
    }
    if (
      erectileDysfunction[first].useranwser?.length == 0 &&
      erectileDysfunction[first].key === "check"
    ) {
      return ErrorToast("Please attempt this question");
    }

    if (erectileDysfunction[first].key === "date") {
      let newData = `${year}-${Number(month) + 1}-${day}`;
      var isAdult = isEighteenYearsOld(newData);

      if (isAdult) {
        await addnew(`${day}-${Number(month) + 1}-${year}`);
        setid(erectileDysfunction[first].next);
      } else {
        setid(erectileDysfunction[first].notvalid);
      }
    } else {
      if (erectileDysfunction[first].nextsub) {
        const foundObject = erectileDysfunction[first].answer.find(
          (item) => item.answerName === erectileDysfunction[first].useranwser
        );

        if (!foundObject) {
          const filteredObjects = erectileDysfunction[first].answer.filter(
            (obj) =>
              erectileDysfunction[first].useranwser.includes(obj.answerName)
          );

          setid(filteredObjects[0].next);
        } else {
          setid(foundObject.next);
        }
      } else {
        setid(erectileDysfunction[first].next);
      }
    }
  };

  // predict is  greater than 18, return true/false
  function isEighteenYearsOld(birthdate) {
    let parts = birthdate.split("-");
    let year = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // Months are zero-based (0 = January, 1 = February, ...)
    let day = parseInt(parts[2], 10);
    var birthDate = new Date(year, month, day);

    var today = new Date();

    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();

    // Check if the person's birthday has already occurred this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  }

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
                erectileDysfunction[first]?.ui === 1
                  ? "d-flex flex-column justify-contant-center questionBody"
                  : "conditioninfo"
              }`}
            >
              <>
                <div className="conditionsub">
                  <h3 className="what_your_sex_head">
                    {erectileDysfunction[first]?.question}
                  </h3>
                  <div className="flow-sub-heading-wrapper">
                    <h5 className="flow-heading">
                      {erectileDysfunction[first]?.subQuestion
                        ? erectileDysfunction[first]?.subQuestion
                        : ""}
                    </h5>
                  </div>
                </div>
                <div className="checktab">
                  {/* single selections */}
                  {erectileDysfunction[first]?.key === "option" ? (
                    <div
                      className={`selectgender ${
                        erectileDysfunction[first]?.answer.length > 9 &&
                        "optionSet"
                      }`}
                    >
                      {erectileDysfunction[first]?.answer.map((ans, i) => {
                        return (
                          <>
                            <div className="male">
                              <input
                                type="radio"
                                id={i}
                                name="age"
                                value={ans.answerName}
                                checked={
                                  erectileDysfunction[first].useranwser ==
                                  ans.answerName
                                    ? true
                                    : false
                                }
                                style={{ width: "0px", padding: "0px" }}
                                onChange={(e) => {
                                  addnew(e.target.value, "option");
                                }}
                              />
                              <label for={i}>{ans.answerName}</label>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : erectileDysfunction[first]?.key === "check" ? ( //muplti selection checkbox
                    <div className="selectgender">
                      {erectileDysfunction[first]?.answer.map((ans, i) => {
                        return (
                          <>
                            <div className="male">
                              <input
                                type={"checkbox"}
                                id={i}
                                name="age"
                                value={ans.answerName}
                                checked={
                                  erectileDysfunction[first].useranwser &&
                                  erectileDysfunction[
                                    first
                                  ].useranwser.includes(ans.answerName)
                                }
                                onChange={(e) => {
                                  if (ans.noneflag) {
                                    erectileDysfunction[first].useranwser = [
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
                            {erectileDysfunction[first]?.answer[i]?.isFlag &&
                              erectileDysfunction[first].useranwser &&
                              erectileDysfunction[first].useranwser.includes(
                                ans.answerName
                              ) && (
                                <div>
                                  <div>
                                    <textarea
                                      defaultValue={
                                        erectileDysfunction[first]
                                          .userotheranwser
                                      }
                                      checked={
                                        erectileDysfunction[first].useranwser &&
                                        erectileDysfunction[
                                          first
                                        ].useranwser.includes(ans.answerName)
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        erectileDysfunction[
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
                      })}
                    </div>
                  ) : erectileDysfunction[first]?.key === "date" ? ( //date picker as inputs
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
                          // disabled
                        />
                      </div>
                    </div>
                  ) : erectileDysfunction[first]?.key === "textarea" ? ( //text area as inputs
                    <div className="checktab">
                      <div className="selectgender exercise">
                        <textarea
                          value={erectileDysfunction[first].useranwser}
                          onChange={(e) => {
                            if (
                              erectileDysfunction[first].isCheckbox &&
                              isNoNote
                            ) {
                              erectileDysfunction[first].useranwser = "";
                            } else {
                              erectileDysfunction[first].useranwser =
                                e.target.value;
                            }

                            setcount(count + 1);
                          }}
                        ></textarea>
                        {(erectileDysfunction[first]?.question ===
                          "Is there anything else you would like to say to the Doctor?" ||
                          erectileDysfunction[first]?.question ===
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
                  ) : erectileDysfunction[first]?.key === "model" ? ( //object as modal
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
                          erectileDysfunction[first]?.heading && "complete"
                        }
                      >
                        <h4>
                          {erectileDysfunction[first]?.menu
                            ? ""
                            : erectileDysfunction[first]?.heading}
                        </h4>
                        <p>{erectileDysfunction[first]?.subHeading}</p>
                        <p>{erectileDysfunction[first]?.text}</p>
                      </Modal.Body>

                      <div className="btnnext">
                        {erectileDysfunction[first]?.heading ? (
                          <button
                            className={
                              erectileDysfunction[first]?.menu ? "" : "btnFix"
                            }
                            onClick={() => {
                              if (erectileDysfunction[first]?.menu) {
                                navigate(
                                  location?.state?.isFirstTime === false
                                    ? "/ManageTreatment"
                                    : "/condition"
                                );
                              } else if (
                                erectileDysfunction[first]?.id === 46
                              ) {
                                let data = calldata();
                                let getQuestionsData = JSON.parse(
                                  localStorage.getItem("answer")
                                );

                                const body = {
                                  questions: [...getQuestionsData, ...data],
                                  questionType: "Erectile Dysfunction",
                                  paymentAmount: codition[0]?.price || 25,
                                };
                                ApiPost("patient/patient_question", body)
                                  .then((response) => {
                                    const questionTypes = codition.find(
                                      (res) =>
                                        res.label === "Erectile Dysfunction"
                                    );
                                    localStorage.setItem(
                                      "questionTypes",
                                      JSON.stringify({
                                        ...questionTypes,
                                        questionId:
                                          response?.data?.data?.questionId,
                                        consultation_id:
                                          response?.data?.data?.consultation_id,
                                      })
                                    );
                                    localStorage.removeItem("isPay");
                                    localStorage.removeItem(
                                      "pathologyTestCharge"
                                    );
                                    navigate(
                                      location?.state?.isFirstTime === false
                                        ? "/payment"
                                        : "/paymentSummary"
                                    );
                                  })
                                  .catch((err) => {
                                    navigate(
                                      location?.state?.isFirstTime === false
                                        ? "/ManageTreatment"
                                        : "/condition"
                                    );
                                    console.log(err);
                                  });
                              }
                            }}
                          >
                            {erectileDysfunction[first]?.menu
                              ? "Got it"
                              : "COMPLETE CONSULT"}
                          </button>
                        ) : erectileDysfunction[first]?.id === 5 ? (
                          <div className="btnnext">
                            <a href="https://www.frenchiemd.com/">
                              <button>ok</button>
                            </a>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setid(erectileDysfunction[first].next)
                            }
                          >
                            Got it
                          </button>
                        )}
                      </div>
                    </Modal>
                  ) : (
                    // hight picker
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

              {erectileDysfunction[first]?.key === "model" ? (
                ""
              ) : (
                // next-prev button
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

export default ErectileDysfunction;
