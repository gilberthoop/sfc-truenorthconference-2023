import { useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, fetchRegistrations } from "@/store";
import { Participant } from "@/utils/types";

export default function useParticipants() {
  // List
  const { data: participants } = useSelector(
    (state: { registrations: { data: Participant[] } }) => state.registrations
  );
  const { isLoading } = useSelector((state: RootState) => state.registrations);

  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  return { participants, isLoading };
}
