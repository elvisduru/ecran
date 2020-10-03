import io from "socket.io-client";

const ENDPOINT = window.location.origin;
export const socket = io(ENDPOINT);
