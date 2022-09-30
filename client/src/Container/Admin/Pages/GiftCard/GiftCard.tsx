import React from "react";
import { deleteGift, getGift } from "../../../../api/admin/gift";
import Crud from "../../../../Component/Crud/Crud";

const GiftCard = () => {

    const columns = ["E-Gift Card Name", "Description", "Amount"]

    return (
        <Crud fetchApi={getGift}
              deleteApi={deleteGift}
              columns={columns}
              resourceName={"E-Gift Card"}
              editPath={"egiftcard"}
        />
    );
};

export default GiftCard;
