import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {

    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null,
      });
    
      useEffect(() => {
        // Create a cancel token source for cleanup
        const source = axios.CancelToken.source();
    
        axios.get('https://hackathonbackend-psi.vercel.app/api/getProposalDetails?leadId=111&customerId=12345', {
          cancelToken: source.token // Use the cancel token
        })
          .then((response) => {
            setState({
              data: response.data.data,
              loading: false,
              error: null,
            });
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              // Request was canceled, no need to handle the error
            } else {
              setState({
                data: null,
                loading: false,
                error: err,
              });
            }
          });
    
        return () => {
          source.cancel('Request canceled due to component unmount');
        };
      }, []);

      console.log(state,"::state")


    return <UserContext.Provider value={{ user: {...state} }}>{children}</UserContext.Provider>;
}

export default UserProvider;
