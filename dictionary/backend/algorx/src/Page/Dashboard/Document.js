import React, { useEffect, useState } from "react";
import add from "../../Assets/images/addfile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import history from "../../Assets/images/history.png";
import {
  APIUploadPost,
  ApiGet,
  ApiPost,
  ApiPut,
} from "../../helpers/API/API_data";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { appContext } from "../../helpers/AppContext";
import { useContext } from "react";
import Loader from "../../Component/Loader/Loader";
import { RxCross2 } from "react-icons/rx";
import { faCloudArrowUp, faFilePlus } from "@fortawesome/pro-regular-svg-icons";

function Document({ patientid }) {
  const [documentget, setdocumentget] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const { loader, setLoader } = useContext(appContext);

  useEffect(() => {
    patientid && getdata();
  }, [patientid]);

  // upload file
  const fileUpload = (e) => {
    setLoader(true);
    let extensions = e.target.files[0].type;
    let extensionsValidation = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];
    if (extensionsValidation.includes(extensions)) {
      if (e?.target?.files && e?.target?.files[0]) {
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        APIUploadPost(`upload/document`, formData)
          .then((res) => {
            if (res.status === 200) {
              setLoader(false);
              SuccessToast("document upload successfully");
              const body = {
                _id: patientid,
                documents: [res?.data?.data?.image],
              };
              ApiPut(`patient/upload_patient_document`, body)
                .then((res) => {
                  getdata();
                })
                .catch((e) => {
                  console.log("e", e);
                });
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } else {
      setLoader(false);
      ErrorToast("Please select valid document file");
    }
  };

  // get document list
  const getdata = () => {
    ApiGet(`patient/patient_document/${patientid}`)
      .then((res) => {
        setdocumentget(res?.data?.data?.[0]?.documents.reverse());
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  // handle view pdf
  const HandleView = (data) => {
    const pdfData = data
      ?.split("/")
      ?.[data?.split("/")?.length - 1]?.split(".")?.[1];
    if (pdfData === "pdf" || pdfData === "docx") {
      window.open(data);
    } else if (pdfData !== "pdf" && pdfData !== "docx") {
      setData(data);
      setIsOpen(true);
    }
  };

  // delete document
  const handleDelete = (val) => {
    console.log("val", val);
    let url = val?.split(
      "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/"
    )[1];
    let body = {
      documentUrl: url,
    };
    ApiPost("patient/delete/document", body)
      .then((res) => {
        SuccessToast(res?.data?.message);
        getdata();
      })
      .catch((err) => {
        console.log("err", err);
        ErrorToast(err?.message);
      });
  };

  return (
    <div
      className="mytreatmentd bg-white border border-neutral-300 rounded-lg"
      style={{ borderRadius: "0px" }}
    >
      <div className="mytreatmentheading bg-white rounded-t-lg">
        <h4>Patient Documents</h4>
      </div>
      <div className="upload rounded-lg">
        {/* upload document inputs */}
        <div className="file_img flex flex-col justify-center items-center">
          {/* <img src={add} alt="" /> */}
          <FontAwesomeIcon icon={faCloudArrowUp} size="xl" />
          <p>Upload a document</p>
        </div>
        <input
          type="file"
          onChange={(e) => fileUpload(e)}
          onClick={(e) => (e.currentTarget.value = null)}
        />
      </div>

      {/* list document */}
      <ul
        className="uploaddata"
        style={{ height: `${documentget?.length > 0 ? "391px" : "30px"}` }}
      >
        {documentget?.length > 0 ? (
          documentget.map((vel) => {
            return (
              <li>
                <div className="d-flex justify-content-between align-items-center bg-white">
                  <div
                    className="uploaddetail d-flex align-items-center"
                    onClick={() => HandleView(vel)}
                  >
                    <div>
                      {/* <img src={history} alt="" /> */}
                      <FontAwesomeIcon icon={faFilePlus} />
                    </div>
                    <div>
                      <div className="uploadget ms-1">
                        {vel?.split("/").at(-1)?.split("_")[0]}
                      </div>
                    </div>
                  </div>
                  <div>
                    <RxCross2
                      className="me-3 cursor-pointer"
                      size={20}
                      onClick={() => handleDelete(vel)}
                    />
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <span
            className="d-flex justify-content-center"
            style={{ fontFamily: "Inter" }}
          >
            There are no documents
          </span>
        )}
      </ul>
      {isOpen && (
        <Lightbox mainSrc={data} onCloseRequest={() => setIsOpen(false)} />
      )}
      {loader && <Loader />}
    </div>
  );
}

export default Document;
