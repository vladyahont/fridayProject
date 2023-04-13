import {AxiosResponse} from "axios";
import {UpdateGradeRequestType, UpdateGradeResponseType} from "./learnType";
import {instance} from "../../../app/instance";

export const learnAPI = {
  updateGrade(data:UpdateGradeRequestType) {
    return instance.put<{}, AxiosResponse<UpdateGradeResponseType>, UpdateGradeRequestType>('cards/grade', data)
  },
}