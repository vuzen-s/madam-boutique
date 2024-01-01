import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";

function Items({currentItems, publicPath}) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div key={item.id} className="w-full">
                        <Product
                            id={item.id}
                            avatar={item.avatar === "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" ? "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" : publicPath + "/" + item.avatar}
                            name={item.name}
                            price={item.price}
                            color={item.color}
                            // badge={item.badge}
                            desc={item.desc}
                            category={item.category}
                            brand={item.brand}
                        />
                    </div>
                ))}
        </>
    );
}

const Pagination = ({itemsPerPage, productsList, publicPath}) => {
    const [items, setItems] = useState([]);
    // console.log(productsList);

    // update list products
    useEffect(() => {
        setItems(productsList);
    }, [productsList])

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items && items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items && items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = items && (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        // console.log(
        //   `User requested page number ${event.selected}, which is offset ${newOffset},`
        // );
        setItemStart(newOffset);
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
                <Items currentItems={currentItems} publicPath={publicPath}/>
            </div>
            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
                <ReactPaginate
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel=""
                    pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                    pageClassName="mr-6"
                    containerClassName="flex text-base font-semibold font-titleFont py-10"
                    activeClassName="bg-black text-white"
                />

                <p className="text-base font-normal text-lightText">
                    Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
                    {items && items.length}
                </p>
            </div>
        </div>
    );
};

export default Pagination;
