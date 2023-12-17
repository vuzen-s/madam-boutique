import React  from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from 'axios';


const CategoryEdit = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    id: yup.string().required("Id is required"),
    name: yup.string().required("Name is required"),
    status: yup.string().required("Status is required"),
    parent: yup.string().required("Parent is required"),
  });

  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              type="text"
              label="Id"
              name="id"
              disabled
              sx={{ gridColumn: "span 2" }}
            />
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              type="text"
              label="Name"
              name="name"
              sx={{ gridColumn: "span 2" }}
            />
            <Field
              as={TextField}
              fullWidth
              select
              variant="filled"
              label="Status"
              name="status"
              sx={{ gridColumn: "span 4" }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Field>
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              type="text"
              label="Parent"
              name="parent"
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="primary" variant="contained">
              Save Changes
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default CategoryEdit;
