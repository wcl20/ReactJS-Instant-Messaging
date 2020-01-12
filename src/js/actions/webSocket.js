import { WS_CONNECT, WS_SEND, WS_DISCONNECT } from "../constants/actionTypes";

export function wsConnect(url) {
  return function (dispatch) {
    dispatch({ type: WS_CONNECT, payload: url });
  }
}

export function wsDisconnect() {
  return function (dispatch) {
    dispatch({ type: WS_DISCONNECT });
  }
}

export function wsSend(message) {
  return function (dispatch) {
    dispatch({ type: WS_SEND, payload: message });
  }
}