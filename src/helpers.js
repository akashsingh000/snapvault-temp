import axios from "axios";


export const downloadImage = async (url, filename) => {
    if (url && filename) {
        await axios.post("/api/image-download", { image: url, filename }).then((data) => {
            if (data.data.image) {
                const downloadLink = document.createElement("a");
                downloadLink.href = data.data.image; //URL.createObjectURL(blob);
                downloadLink.download = filename;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        }).catch((err) => {
            return err.message
        })
    }
}


export const reactStyles = {
    control: (base, state) => ({
        ...base,
        background: "transparent",
        // match with the menu
        borderRadius: "8px",
        // Overwrittes the different states of border
        borderColor: "#0000001A",
        // paddingInline: "20px",
        outline: "#002424",
        boxShadow: "none",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "20px",
        color: "#14142B",
        // Removes weird border around container
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: "none"
        }
    }),
    option: (provided, state) => ({
        ...provided,
        width: "100%",
        backgroundColor: state.isSelected ? "#E32124" : null,
        color: state.isSelected ? "#ffffff" : "#4E4B66",
        zIndex: 20,
        fontFamily: "Lato",
        fontSize: "18px",
        letterSpacing: "0.25px",
        lineHeight: "16px",
        margin: "4px 0px 4px"
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#00000080",
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "0.25px",
            lineHeight: "20px"

        };
    },
    dropdownIndicator: (provided) => ({
        ...provided,
        svg: {
            fill: "#E32124"
        },

    }),
    menu: (provided) => ({ ...provided, zIndex: 20, padding: "5px", color: '#4E4B66', })
};