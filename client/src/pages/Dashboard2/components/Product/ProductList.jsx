import { Breadcrumb } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const navigate = useNavigate()

    const handleCreateUser = () => {
      navigate('../products/create');
    }
    return (
        <div className="bg-white rounded-md p-2 flex justify-between items-center shadow-md">
            <Breadcrumb style={{ margin: "5px 0", fontSize: "20px",  fontWeight: "500"}}>
                <Breadcrumb.Item>Product</Breadcrumb.Item>
                <Breadcrumb.Item>Product list</Breadcrumb.Item>
            </Breadcrumb>
            <Button variant="contained" color="success" onClick={handleCreateUser} style={{ width: "180px", height: "40px" }}>Create Product</Button>
        </div>
    )
}

export default ProductList;