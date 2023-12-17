import { Breadcrumb } from "antd";

const ProductEdit = () => {
    return (
        <div className="bg-white rounded-md p-2">
            <Breadcrumb style={{ margin: "5px 0", fontSize: "20px",  fontWeight: "500"}}>
                <Breadcrumb.Item>Product</Breadcrumb.Item>
                <Breadcrumb.Item>Product edit</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default ProductEdit;