import React from "react";
import { deleteSubCategory, getSubCategories} from "../../../../api/admin/category";
import Crud from "../../../../Component/Crud/Crud";

const SubCategory = () => {
    let columns = [
        'Name', 'Parent'
    ]

    return <Crud fetchApi={getSubCategories}
                 deleteApi={deleteSubCategory}
                 columns={columns}
                 resourceName={"Sub SubCategory"}
                 editPath={"categories"}
    />
};
export default SubCategory;
