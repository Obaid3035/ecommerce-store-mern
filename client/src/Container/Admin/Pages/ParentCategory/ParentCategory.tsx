import React from "react";
import {deleteParentCategory, getParentCategory} from "../../../../api/admin/parentCategory";
import Crud from "../../../../Component/Crud/Crud";

const ParentCategory = () => {

    let columns = [
        'Name'
    ]

    return <Crud fetchApi={getParentCategory}
                 deleteApi={deleteParentCategory}
                 columns={columns}
                 resourceName={"Parent Category"}
                 editPath={"product-type"}
    />
};
export default ParentCategory;
