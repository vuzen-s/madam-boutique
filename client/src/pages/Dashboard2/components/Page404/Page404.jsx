import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Page404 = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full md:flex-row">
      <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-2.5">
        You no longer have access to the admin page, please return to the login
        page
      </h1>
      <div className="w-full h-full">
          <Link to="/signin">
            <Button
                sx={{
                  bgcolor: "#3cb371",
                  color: "white",
                  "&:hover": { bgcolor: "#2b8b57" },
                  width: "200px",
                  height: "43px"
                }}
              >
                Back To Home
            </Button>
          </Link>
        </div>
    </div>
  );
};

export default Page404;
