const productsArray = [
    {
        id: "price_1MHv81Jo9QYHlBWRn2aCTeRA",
        imageUrl: "https://cannaboys.vercel.app/imgs/cbdgummies.png",
        title: "Gomitas CBD-250mg",
        price: 499
    },
    {
        id: "price_1MHv9SJo9QYHlBWRWIillpuF",
        imageUrl: "https://cannaboys.vercel.app/imgs/dopegummies.png",
        title: "Gomitas CBD-1,000mg",
        price: 1199
    },
    {
        id: "price_1MIdbTJo9QYHlBWRliNK5AvI",
        imageUrl: "https://cannaboys.vercel.app/imgs/cbdoil.png",
        title: "Aceite CBD-250mg",
        price: 499
    },
    {
        id: "price_1MIdcOJo9QYHlBWRj7EsF2yL",
        imageUrl: "https://cannaboys.vercel.app/imgs/FullSpectrum.png",
        title: "Aceite CBD-550mg",
        price: 799
    },
    {
        id: "price_1MIdkkJo9QYHlBWR6m8O8IhG",
        imageUrl: "https://cannaboys.vercel.app/imgs/cream2.png",
        title: "Crema Alivio CBD-250mg",
        price: 499
    },
    {
        id: "price_1MIdlaJo9QYHlBWRKLuCIQU7",
        imageUrl: "https://cannaboys.vercel.app/imgs/cbdcream.png",
        title: "Gel Ultra Alivio CBD-1000mg",
        price: 999
    },
    {
        id: "price_1MIdmGJo9QYHlBWRV0vGZMti",
        imageUrl: "	https://cannaboys.vercel.app/imgs/cbdhoney.png",
        title: "Palitos de miel - 10 pzas",
        price: 249
    },
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };