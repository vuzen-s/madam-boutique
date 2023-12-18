import { Breadcrumb } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CategoryCreate = () => {
    const navigate = useNavigate();

    const handleBackToList = () => {
      navigate('../categories');
    }
    return (
        <div className="bg-white rounded-md p-2 flex justify-between items-center shadow-md">
            <Breadcrumb style={{ margin: "5px 0", fontSize: "20px",  fontWeight: "500"}}>
                <Breadcrumb.Item>Category</Breadcrumb.Item>
                <Breadcrumb.Item>Category create</Breadcrumb.Item>
            </Breadcrumb>
            <Button variant="contained" color="success" onClick={handleBackToList} style={{ width: "100px", height: "40px" }}>Back</Button>
        </div>
    )
}

export default CategoryCreate;