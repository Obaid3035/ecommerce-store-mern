import React, {useState} from 'react';
import {RMIUploader} from "react-multiple-image-uploader";



const dataSources = [
    {
        id: 1,
        dataURL: "https://picsum.photos/seed/1/600",
    },
    {
        id: 2,
        dataURL: "https://picsum.photos/seed/2/600",
    },
    {
        id: 3,
        dataURL: "https://picsum.photos/seed/3/600",
    },
    {
        id: 4,
        dataURL: "https://picsum.photos/seed/4/600",
    },
    {
        id: 5,
        dataURL: "https://picsum.photos/seed/5/600",
    },
    {
        id: 6,
        dataURL: "https://picsum.photos/seed/6/600",
    },
    {
        id: 7,
        dataURL: "https://picsum.photos/seed/7/600",
    },
    {
        id: 8,
        dataURL: "https://picsum.photos/seed/8/600",
    },
    {
        id: 9,
        dataURL: "https://picsum.photos/seed/9/600",
    },
    {
        id: 10,
        dataURL: "https://picsum.photos/seed/10/600",
    },
];

const MultipleImageUploader = () => {

    const [visible, setVisible] = useState(false);
    const handleSetVisible = () => {
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };
    const onUpload = (data: any) => {
        const files = data.map((img: any) => img.file);
        const formData = new FormData();
        for (const i of files) {
            formData.append('images', i);
        }
        console.log(formData);
    };
    const onSelect = (data: any) => {
        console.log("Select files", data);
    };
    const onRemove = (id: any) => {
        console.log("Remove image id", id);
    };



    return (
        <div>
            <RMIUploader
                dataSources={dataSources}
                onSelect={onSelect}
                onUpload={onUpload}
                onRemove={onRemove}
                warnMessage={"Lorem"}/>
        </div>

);
};

export default MultipleImageUploader;
