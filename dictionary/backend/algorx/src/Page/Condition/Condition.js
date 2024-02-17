import React, { useState } from "react";
import { codition } from "../../data/jsonData";
import { Tooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../../Component/Toaster/Toaster";
import { useEffect } from "react";
import { ApiGet } from "../../helpers/API/API_data";

const Condition = () => {
  const [selected, setSelected] = useState("");

  const [userData, setUserData] = useState();
  const [tooltipOpen, settooltipOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("answer"));
    if (obj?.length > 0) {
      localStorage.setItem("answer", JSON.stringify([obj[0]]));
    }
  }, []);
// handle select checkbox
  const selectvalue = (v, i) => {
    setSelected(v);
  };

  // get user data
  useEffect(() => {
    ApiGet("patient").then((res) => {
      setUserData(res?.data?.data?.[0]);
    });
  }, []);

  // handle next
  const nextFunc = (v) => {
    const sameflow = userData?.questionTypes.find((val) => val === v.label);
    localStorage.setItem("questionTypes", JSON.stringify(v));
    if (!selected) {
      ErrorToast("Please Select At Least One Value");
    } else if (v.label === sameflow) {
      navigate(`/Payment`);
    } else {
      navigate(`/${v.pathname}`);
    }
  };

  function toggle() {
    settooltipOpen(!tooltipOpen);
  }
  return (
    <>
      <div className="conditionsub">
        <h3 className="font_16_title" style={{textTransform:'inherit'}}>
          So tell us what your health concern is today?
        </h3>
      </div>
{/* enlist conditions as checkbox */}
      <div className="checktab condetail">
        <div className="selecttab">
          {codition.map((v, i) => (
            <div key={i} className={`male`} onClick={() => selectvalue(v, i)}>
              <input style={{ width: "0px", padding: "0px" }} type="radio" id={v.id} name="age" value={v.id} />
              <label
                for={v.id}
                className={i == 2 && "curser-help"}
                id={i == 2 && "TooltipExample"}
              >
                {v.label === "STI/STD" ? "STI Screening" : v.label}
              </label>
              <Tooltip
                placement="right"
                isOpen={tooltipOpen}
                target="TooltipExample"
                toggle={toggle}
              >
                <span>Chlamydia/Gonorrhoea + optional Syphillis/HIV</span>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
      <div className="btnnext">
        <button className="nextBtn" onClick={() => nextFunc(selected)}>
          { }
          Next&nbsp;
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.28117 5.33117L4.70517 1.75517L5.64784 0.8125L10.8332 5.99783L5.64784 11.1832L4.70517 10.2405L8.28117 6.6645H0.166504V5.33117H8.28117Z"
              fill="#F8F5F0"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Condition;
