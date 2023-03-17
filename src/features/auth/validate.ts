import * as Yup from "yup";

const emailValidation = Yup.string().required('please enter email').email('invalid email address')
const passwordValidation = Yup.string().required('please enter password').min(8).max(16)
const confirmPasswordValidation = Yup.string().required('please enter password')
    .oneOf([Yup.ref('password')], 'Passwords must match')
export const getValidationSchemaSingIn = () => Yup.object<FormikErrorsType>().shape({
  email: emailValidation,
  password: passwordValidation,
})
export const getValidationSchemaSingUp = () => Yup.object<FormikErrorsType>().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})
export const getValidationSchemaEmail = () => Yup.object<FormikErrorsType>().shape({
  email: emailValidation,
})
export const getValidationSchemaPassword = () => Yup.object<FormikErrorsType>().shape({
  password: passwordValidation ,
})

type FormikErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}