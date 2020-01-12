import { WS_CONNECT, WS_DISCONNECT, WS_SEND, ADD_MESSAGE, CLEAR_MESSAGE } from "../constants/actionTypes";

// Web Socket instance
let webSocket;

export default function WSMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {

      switch (action.type) {

        case WS_CONNECT:
          // Create new web socket
          webSocket = new WebSocket(action.payload);
          // Web socket on open event
          const message = { sender: "system", text: `${sessionStorage.getItem("user")} Joined the chat` };
          webSocket.onopen = () => dispatch({ type: WS_SEND, payload: message });
          // Web socket on message event
          webSocket.onmessage = event => dispatch({ type: ADD_MESSAGE, payload: JSON.parse(event.data) });
          break;

        case WS_DISCONNECT:
          dispatch({ type: CLEAR_MESSAGE });
          // Close web socket
          webSocket.close();
          break;

        case WS_SEND:
          // Send message through socket
          webSocket.send(JSON.stringify(action.payload));
          break;

        default:
          break;
      }

      return next(action);
    }
  }
}
