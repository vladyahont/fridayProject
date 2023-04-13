export type UpdateGradeRequestType = {
  grade: number
  card_id: string
}
export type UpdateGradeResponseType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}