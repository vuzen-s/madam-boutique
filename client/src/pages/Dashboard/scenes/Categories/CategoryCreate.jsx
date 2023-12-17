import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

const CategoryCreate = ({ onFormSubmit }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    axios.post('http://127.0.0.1:8000/api/categories', values)
      .then(response => {
        
        console.log('API Response:', response.data);
      })
      .catch(error => {
      
        console.error('API Error:', error);
      });
  };

 

  return (
    <Box m="20px">
      <Header title="CREATE CATEGORY" subtitle="Create a New Category" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
                name="id"
                error={!!touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
             

             
              <TextField
                fullWidth
                select
                variant="filled"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              >
              
                <MenuItem value="option1">Hoạt động</MenuItem>
                <MenuItem value="option2">Không hoạt động</MenuItem>
               
              
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Parent"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.parent}
                name="parent"
                error={!!touched.parent && !!errors.parent}
                helperText={touched.parent && errors.parent}
                sx={{ gridColumn: "span 4" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  id: yup.string().required("required"),
  name: yup.string().required("required"),
  status: yup.string().required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  parent: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues = {
  id: "",
  name: "",
  status: "",
  parent: "",
 
};

export default CategoryCreate;
