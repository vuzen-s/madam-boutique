import { useEffect, useState } from "react";

const ApiMigration = () => {
    const [migrate, setMigrate] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products', {
            method: "GET",
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.migrations);
                setMigrate(data.migrations);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <h2>ApiMigration</h2>
            {
                migrate && migrate.map((data, index) => 
                    <p key={index}>{data.migration}</p>
                )
            }
        </>
    )
}

export default ApiMigration;