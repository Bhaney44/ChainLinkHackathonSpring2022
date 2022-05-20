import { combineReducers } from "redux";

const status = (
  state = {
    alertModal: { openModal: false, modalContent: "" },
    electModal: { openElectModal: false, modalData: null },
    voteModal: { openModalVote: false, voteData: null },
    confirmWallet: { openWallet: false, walletContent: ""},
    addressNum: 0,
    address: null,
    balance : []
  },
  action
) => {
  switch (action.type) {
    
    case "getBalance" : 
      return {...state, balance : action.balance}

    case "setAlgoAddress" : 
      localStorage.setItem("address", `${action?.addr}`);
      return { ...state, addressNum: action.addressIndex };

    case "alert_modal":
      return {
        ...state,
        alertModal: { openModal: true, modalContent: action.alertContent },
      };

    case "close_modal":
      return { ...state, alertModal: { openModal: false, modalContent: "" } };

    case "confirm_wallet":
      return {...state, confirmWallet : { openWallet : true, walletContent: action.alertContent }} ; 

    case "close_wallet" :
      return {...state, confirmWallet : {openWallet : false, walletContent : ""} };
    default:
      return state;
  }
};

export default combineReducers({ status });
