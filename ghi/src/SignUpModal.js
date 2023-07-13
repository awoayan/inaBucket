import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "./app/api";
import { preventDefault } from "./app/utils";
import { showModal, updateField, SIGN_UP_MODAL } from "./app/accountSlice";
import Notification from "./Notification";
