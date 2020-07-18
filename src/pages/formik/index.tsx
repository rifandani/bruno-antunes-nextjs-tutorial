import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  FormGroup,
  Box,
  Button,
} from '@material-ui/core';
import React from 'react';
import { Formik, Form, Field, useField, ErrorMessage } from 'formik';
import { InvestmentDetails } from '../../../api/InvestmentDetails';
import { object, string, number, boolean, array, mixed } from 'yup';

const initialValues: InvestmentDetails = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: -1,
  acceptedTermsAndConditions: false,
};

const handleSubmit = (values: any, formikHelpers: any) => {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(values);
      console.log(formikHelpers);
      console.log('---------');
      res();
    }, 5000);
  });
};

export default function FormikForm() {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h4">
          New Account
        </Typography>

        <Formik
          validationSchema={object({
            fullName: string()
              .required('My own errors message')
              .min(3)
              .max(100),
            initialInvestment: number().required().min(100),
            dependents: number().required().min(0).max(5),
            acceptedTermsAndConditions: boolean().oneOf([true]),
            investmentRisk: array(
              string().oneOf(['High', 'Medium', 'Low']),
            ).min(1),
            commentAboutInvestmentRisk: mixed().when('investmentRisk', {
              is: (investmentRisk: string[]) =>
                investmentRisk.find((ir) => ir === 'High'),
              then: string().required().min(20).max(100),
              otherwise: string().min(20).max(100),
            }),
          })}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {/* grab the context object from formik */}
          {({ values, errors, isSubmitting, touched, isValidating }) => (
            <Form>
              {/* collab formik with materialUI */}
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="fullName" as={TextField} label="Full Name" />
                  <ErrorMessage name="fullName" />
                  {/* {touched.fullName && errors.fullName ? errors.fullName : null} */}
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="initialInvestment"
                    type="number"
                    as={TextField}
                    label="Initial Investment"
                  />
                  <ErrorMessage name="initialInvestment" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <label>Select the risk you want to take:</label>
                <FormGroup>
                  <MyCheckbox
                    name="investmentRisk"
                    value="High"
                    label="High - Very Risky"
                  />
                  <MyCheckbox
                    name="investmentRisk"
                    value="Medium"
                    label="Medium - Risky"
                  />
                  <MyCheckbox
                    name="investmentRisk"
                    value="Low"
                    label="Low - Safe"
                  />
                </FormGroup>
                <ErrorMessage name="investmentRisk" />
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="commentAboutInvestmentRisk"
                    as={TextField}
                    multiline
                    rows={3}
                    rowsMax={10}
                  />
                  <ErrorMessage name="commentAboutInvestmentRisk" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="dependents"
                    label="dependents"
                    as={TextField}
                    select
                  >
                    <MenuItem value={-1}>Select...</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                  <ErrorMessage name="dependents" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckbox
                    name="acceptedTermsAndConditions"
                    label="Accept Terms and Conditions"
                  />
                  <ErrorMessage name="acceptedTermsAndConditions" />
                </FormGroup>
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting || isValidating}
              >
                Submit
              </Button>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
