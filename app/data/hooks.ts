import FAKE_DATA from "@/app/data/fakeData";
import ReportedProblem from "@/app/types/types";
import { create } from "zustand";

type fakeDataStoreType = {
  problems: ReportedProblem[];
  setProblems: (problems: ReportedProblem[]) => void;
};

export const useFakeDataStore = create<fakeDataStoreType>()((set) => ({
  problems: FAKE_DATA,
  setProblems: (problems) => set({ problems }),
}));
