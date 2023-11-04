import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {

  const [state, setStates] = useState({
    data: null,
    loading: true,
    error: null,
    edit: false
  });

  useEffect(() => {
    // Create a cancel token source for cleanup
    const source = axios.CancelToken.source();

    axios.get('http://hackathonbackend-psi.vercel.app/api/getProposalDetails?leadId=111&customerId=12345', {
      cancelToken: source.token // Use the cancel token
    })
      .then((response) => {
        setStates({
          data: response.data.data,
          loading: false,
          error: null,
          edit: false
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          // Request was canceled, no need to handle the error
        } else {
          setStates({
            data: null,
            loading: false,
            error: err,
            edit: false
          });
        }
      });

    return () => {
      source.cancel('Request canceled due to component unmount');
    };
  }, []);

  console.log(state, "::state")


  return <UserContext.Provider value={{ user: { ...state,...state.extra },setStates }}>{children}</UserContext.Provider>;
}

export default UserProvider;
