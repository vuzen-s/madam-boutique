import { Breadcrumb } from "antd";

const CategoryCreate = () => {
    return (
        <div className="bg-white rounded-md p-2">
            <Breadcrumb style={{ margin: "5px 0", fontSize: "20px",  fontWeight: "500"}}>
                <Breadcrumb.Item>Category</Breadcrumb.Item>
                <Breadcrumb.Item>Category create</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default CategoryCreate;