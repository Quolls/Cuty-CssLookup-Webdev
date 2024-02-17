import React from "react";
import { useNavigate } from "react-router-dom";
import dashprofile2 from "../../Assets/images/chat/avatarBlue.png";
// My treating doctor functions
function MyTreatment(doctorData) {
  const navigate = useNavigate()
  return (
    <div className="mytreatmentd bg-white border border-neutral-300 rounded-lg">
      <div className="mytreatmentheading bg-white rounded-t-lg">
        <h4>My treating doctor</h4>
      </div>
      {doctorData.doctorData?.length > 0  ? (
         <div>
         {doctorData?.doctorData.map((ele) => {
           return (
             <ul className="doctorinfo">
               <li className="docmain">
                 <div className="docdetail">
                   <img
                     style={{
                       width: "110px",
                       height: "110px",
                       borderRadius: "50%",
                     }}
                     src={
                       ele?.doctorDetails?.[0]?.image
                         ? ele?.doctorDetails?.[0]?.image
                         : dashprofile2
                     }
                     alt=""
                   />
                   <h5 className="text-capitalize">
                     {ele?.doctorDetails
                       ? `${ele?.doctorDetails?.[0]?.firstName} ${ele?.doctorDetails?.[0]?.lastName}`
                       : "-"}
                   </h5>
                   <h5 className="text-capitalize">
                     {ele?.doctorDetails?.[0]?.pronouns
                       ? `${ele?.doctorDetails?.[0]?.pronouns}`
                       : "-"}
                   </h5>
                   <div className="weekname">
                     <a
                       onClick={() =>
                         navigate(`/ChatScreen`, {
                           state: { doctorId: ele?.doctorDetails?.[0]?._id },
                         })
                       }
                       className="redbtn"
                       style={{ cursor: "pointer" }}
                     >
                       CHAT WITH DOCTOR
                     </a>
                   </div>
                 </div>
               </li>
               <li>
                 <div className="treatmenttimeheading">
                 </div>
                 <div className="treatmentdetial">
                   <ul>
                     <li><p>{ele?.doctorDetails?.[0]?.bio ? ele?.doctorDetails?.[0]?.bio : '-'}</p></li>
                     <li><div className='d-flex align-items-center flex-wrap'>{ele?.doctorDetails?.[0]?.conditionSpecialities?.length > 0 ? ele?.doctorDetails?.[0]?.conditionSpecialities?.map((val) => {
                       return (<span className='me-1' style={{
                         opacity
                           : "1"
                       }}>{val}, </span>)
                     }) : ""}</div></li>
                     <li className='mt-3'>
                       <div className='row w-100'>
                         <div className='col-md-6  m-0 ps-0 pe-0'>
                           <p className='fw-semibold'>Prescriber Number</p>
                           <p>{ele?.doctorDetails?.[0]?.prescriberNumber ? ele?.doctorDetails?.[0]?.prescriberNumber : '-'}</p>
                         </div>
                         <div className='col-md-6  m-0 ps-0 pe-0'>
                           <p className='fw-semibold'>Provider Number</p>
                           <p>{ele?.doctorDetails?.[0]?.frenchieProviderNumber ? ele?.doctorDetails?.[0]?.frenchieProviderNumber : '-'}</p>
                         </div>
                       </div>
                     </li>
                   </ul>
                 </div>

               </li>
             </ul>
           );
         })}
       </div>
      
      ) : (
        <p className=" No_Doctor_Assigned text-center py-5 m-0">
        There is No Doctor Assigned To You{" "}
      </p>
      )}
    </div>
  );
}

export default MyTreatment;
