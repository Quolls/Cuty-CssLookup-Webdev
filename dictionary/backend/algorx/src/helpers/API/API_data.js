import { ErrorToast } from "../../Component/Toaster/Toaster";
import { API } from "../../config/API/api.config";
import * as authUtil from "../../utils/auth.util";
import Auth from "../Auth";
import { decryptData, encryptdata } from "../Encrypt";

export const BaseURL = API.endpoint + "/";
export const Bucket =
  "https://medicine-storage.s3.ap-southeast-2.amazonaws.com/";
const axios = require("axios").default;
const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true,
};

export const ApiPostNoAuth = (type, userData) => {
  const encryptedData = {encryptedData:encryptdata(userData)}

  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + type,
        encryptedData,
        getHttpOptions({ ...defaultHeaders, isAuth: false })
      )
      .then((responseJson) => {
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
        authUtil.setrefrencetoken();
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        console.log("error", error);
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then(async (responseJson) => {
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
      })
      .catch((error) => {
        console.log("error", error);
        if (error && error?.response?.status === 401) Auth.deauthenticateUser();
        reject(error);
      });
  });
};


export const ApiGet = (type, token) => {
  const Id = JSON.parse(localStorage.getItem("logindata"));
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, {
        headers: {
          Authorization: Id?.token,
          'Cache-Control': 'no-cache'
        },
      })
      .then((responseJson) => {
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiPost = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("logindata"));
  const encryptedData = {encryptedData:encryptdata(userData)}

  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, encryptedData, {
        headers: {
          Authorization: Id?.token,
        },
      })
      .then((responseJson) => {
       
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401 || error?.response?.status === 410) {
          ErrorToast(error?.response?.data?.message)
          Auth.deauthenticateUser();
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
          setTimeout(()=>{
            window.location.href = '/'
          },100)
     
        }
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          error.response.data.data = decryptData(error.response.data?.data)
          reject(error.response.data);
        } else {
          error.response.data.data  =   decryptData(error.response.data?.data)
          reject(error.response.data);
        }
      });
  });
};

export const APIUploadPost = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("logindata"));
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, {
        headers: {
          Authorization: Id?.token,
        },
      })
      .then((responseJson) => {
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiPostAuth = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("logindata"));

  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, {
        headers: {
          Authorization: Id?.token,
        },
      })
      .then((responseJson) => {
  
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiPut = (type, userData) => {
  const encryptedData = {encryptedData:encryptdata(userData)}
  const Id = JSON.parse(localStorage.getItem("logindata"));
  let ext = "admin";

  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + type, encryptedData, {
        headers: {
          Authorization: Id?.token,
        },
      })
      .then((responseJson) => {
        const decreptedData =   decryptData(responseJson?.data?.data,type)
        responseJson.data.data = decreptedData;
        resolve(responseJson);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};


export const Logout = () => {
  return ApiPost("/accounts/logout", {});
};

export const getHttpOptions = (options = defaultHeaders) => {
  let loginData = JSON.parse(localStorage.getItem("logindata"));
  let headers = {};

  if (options.hasOwnProperty("isAuth") && options.isAuth) {
    headers["Authorization"] = loginData?.token;
    headers["Cache-Control"] = "no-cache";
  }

  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Authorization"] = loginData?.token;
    headers["Content-Type"] = "application/json";
  }

  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers["Authorization"] = loginData?.token;
    headers = { ...headers, ...options.AdditionalParams };
  }

  return { headers };
};

export const ApiGetInce = (type, tokan) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const body = await response.json();

          return body;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        console.error(error);
        reject(error);
      });
  });
};

export const ApiDeleteInce = (type, tokan, body) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          const body1 = await response.json();

          return body1;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        console.error(error);
        reject(error);
      });
  });
};

export const ApiPutInce = (type, tokan, body) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          const body1 = await response.json();

          return body1;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        console.error(error);
        reject(error);
      });
  });
};

export const ApiPostInce = (type, tokan, body) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          const body1 = await response.json();

          return body1;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        if (error && error?.response?.status === 401) {
          Auth.deauthenticateUser();
        }
        console.error(error);
        reject(error);
      });
  });
};

export const ApiGetMessage = (type, messageId) => {
  const Id = JSON.parse(localStorage.getItem("logindata"));
  return new Promise((resolve, reject) => {
    axios
      .get(`${BaseURL}${type}/message/${messageId}`, {
        headers: {
          Authorization: Id?.token,
        }})
      .then((responseJson) => {
        resolve(responseJson?.data?.data);
      })
      .catch((error) => {
        reject(error);
        console.error("error", error);
      });
  });
};

export const reftoken = async (i, j, k) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const rtoken = JSON.parse(localStorage.getItem("ref_token"));
  const body = {
    old_token: token,
    refresh_token: rtoken,
  };
  let extracol;
  await ApiPostNoAuth("admin/generate_token", body)
    .then(async (res) => {
      authUtil.setToken(res.data.data.token);

      if (i == "ApiGet") {
        await ApiGet(j).then((res) => {
          extracol = res;
        });
      } else if (i == "ApiDelete") {
        // await ApiDelete(j).then((res) => {
        //   extracol = res;
        // });
      } else if (i == "ApiPut") {
        await ApiPut(j, k).then((res) => {
          extracol = res;
        });
      } else if (i == "ApiPost") {
        await ApiPost(j, k).then((res) => {
          extracol = res;
        });
      } else if (i == "ApiUpload") {
        // await ApiUpload(j, k).then((res) => {
        //   extracol = res;
        // });
      }
    })
    .catch((err) => {});
  return extracol;
};
