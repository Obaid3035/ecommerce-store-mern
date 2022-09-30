import React from "react";
import { deleteColor, getColor } from "../../../../api/admin/color";
import Crud from "../../../../Component/Crud/Crud";

const Colors = () => {
  let columns = [ "Colors Name" ];

  return <Crud fetchApi={getColor}
               deleteApi={deleteColor}
               columns={columns}
               resourceName={"Colors"}
               editPath={"colors"}
  />
};
export default Colors;
