import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import axios from 'axios';
const CollectionCreate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    axios.put('http://127.0.0.1:8000/api/collections/create', values)
      .then(response => {
        // Xử lý kết quả từ API nếu cần
        console.log('API Response:', response.data);
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.error('API Error:', error);
      });
  };

  return (
    <Box m="20px">
      <Header title="CREATE COLLECTION" subtitle="Create a New Collection" />

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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name_design"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name_design}
                name="name_design"
                error={!!touched.name_design && !!errors.name_design}
                helperText={touched.name_design && errors.name_design}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Collection
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  name_design: yup.string().required("required"),

});
const initialValues = {
  name: "",
  name_design: "",

};

export default CollectionCreate;
