import { Breadcrumb } from "antd";

const ProductList = () => {
    return (
        <div className="bg-white rounded-md p-2">
            <Breadcrumb style={{ margin: "5px 0", fontSize: "20px",  fontWeight: "500"}}>
                <Breadcrumb.Item>Product</Breadcrumb.Item>
                <Breadcrumb.Item>Product list</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default ProductList;