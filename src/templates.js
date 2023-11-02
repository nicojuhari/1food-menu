export const createMenuHTML = (obj) => {
    let { version } = obj;
    let menuHTML = "";

    if (version == 1) menuHTML = menuDesignOne(obj);
    if (version == 2) menuHTML = menuDesignTwo(obj);
    if (version == 3) menuHTML = menuDesignTree(obj);
    if (version == 4) menuHTML = menuDesignFour(obj);

    return menuHTML;
};

export const allergensHTML = (prod_allergens) => {
    let allergens = window.__OneFoodMenu__.allergens;
    let allergensHTML = "";

    if (prod_allergens?.length == 0 || !prod_allergens) return "";

    allergensHTML += prod_allergens.map((allergen) => {
        return `<div data-prod-allergen class="ofm-allergen__item">${
            allergens.find((al) => al.uid == allergen).name
        }</div>`;
    })
    .join("");
    // allergensHTML += `<div class="mr-auto pr-2"></div>`;

    return allergensHTML;
};

export const tagsHTML = (tags) => {
    if (tags?.length == 0 || !tags) return "";
    return tags.map((tag) => {
        return ` <div data-prod-tag class="ofm-tag">${tag}</div>`;
    }).join("")
}

export let optionsHTML = (options, inModal = false) => {
    let priceSymbol = window.__OneFoodMenu__.configs.priceSymbol;
    let version = window.__OneFoodMenu__.configs.version;
    let html = ''
    return options
        .map((item, idx) => {
            html = "";
            if((version == 1 || version == 2) && idx >= 1 && !inModal) {
               return html;
            }
            
            html += `<div class="ofm-product__options">
                        
                        <div class="ofm-product__size ofm-text-sm">${item?.size}</div>`;
                        
                html += `<div class="ofm-product__price">`;
                
                    if(item.salePrice) {
                        html += `<div class="ofm-price ofm-text-lg">
                                    ${priceSymbol} ${item.salePrice}
                                </div>`;
                        html += `<div class="ofm-price ofm-price--old ofm-text-sm">
                                    ${priceSymbol} ${item.price}
                                </div>`;
                    } else {
                        html += `<div class="ofm-price ofm-text-lg">
                                    ${priceSymbol} ${item.price}
                                </div>`;
                    }

                    if ((version == 1 || version == 2) && !inModal && options[1]) {
                        html += `<div class="arrow-down rounded bg-slate-200"></div>`;
                    }

                html += `</div>`;
            html += `</div>`;
            return html;
        })
        .join("");
    };

const menuDesignOne = ({ products, categories }) => {

    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `   <div class="ofm-product" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `   <div class="h-full w-40 image-bg image-bg-2 shrink-0 rounded-l-xl">
                                        <div class="image-bg h-full w-full rounded-l-xl" style="background-image: url(${product.imageUrl})"> </div>
                                    </div>`;

                    // product content
                    html += `<div class="ofm-product__text">`;

                    //product name
                    html += `<div class="ofm-product__title line-clamp-1">${product.name}</div>`;

                    //productTags && Allergens

                    if (product.allergens?.length || product.tags?.length) {
                        html += `<div class="ofm-product__allergens">`;
                            html += allergensHTML(product.allergens);
                            html += tagsHTML(product.tags);
                        html += `</div>`;
                    }
                    
                    //product description
                    html += `<div class="ofm-product__desc line-clamp-2">${product.description}</div>`;

                    //prices
                    product.options && (html += optionsHTML(product.options));
                    // html += `<div class="ofm-product__price">`;
                        
                    // html += `</div>`;
                    

                    //closing tags
                    html += `   </div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="ofm-category my-6" data-category>
                        <h2 class="ofm-category__title">${category.name}</h2> 
                        <div class="ofm-category__items"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignTwo = ({ products, categories, priceSymbol }) => {

    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="ofm-product snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72" data-product-block="${product.uid}" >`;

                    // product Image
                    html += `<div class="h-52 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                                    <div class="image-bg h-full w-full rounded-t-xl" style="background-image: url(${product.imageUrl})"> </div>
                                </div>`;

                    // product content
                    html += `<div class="p-4 flex flex-col flex-grow">`;

                    //product name
                    html += `<div class="font-bold pb-2">${product.name}</div>`;

                    //productTags && Allergens
                    if(product.allergens?.length > 0 || product.tags?.length > 0) {
                        html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full my-2">`;
                        html += allergensHTML(product.allergens);
                        product.tags && (html += tagsHTML(product.tags));
                        html += `</div>`;
                    }

                    //product description
                    html += `<div class="opacity-60 leading-tight line-clamp-2 w-full mt-auto">${product.description}</div>`;

                    //product prices
                    html += `<div class="pt-4">`;
                        product.options && (html += optionsHTML(product.options));
                    html += `</div>`;

                    //closing tags
                    html += `   </div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="ofm-category" data-category>
                        <h2 class="ofm-category-title">${category.name}</h2>
                        <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">${prod}</div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignTree = ({ products, categories }) => {
    return categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="ofm-product bg-white rounded-md shadow p-4 md:p-6 flex flex-shrink-0 relative">`;

                    // product content
                    html += `<div class="w-full flex flex-col">`;

                    //product name
                    html += `<div class="font-bold mb-auto pb-2 text-2xl line-clamp-2">${product.name}</div>`;

                    //productTags && Allergens
                    if (product.tags?.length || product.allergens?.length) {
                        html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full py-2">`;
                            html += allergensHTML(product.allergens);
                            html += tagsHTML(product.tags);
                        html += `</div>`;
                    }

                    //product description
                    html += `<div class="opacity-50 leading-tight w-full mb-2 text-lg">${product.description}</div>`;

                    html += `<div>`;
                        product.options && (html += optionsHTML(product.options));
                    html += `</div>`;

                    //closing tags
                    html += `</div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `<div class="ofm-category" data-category>
                        <h2 class="text-center text-2xl md:text-3xl mb-6 font-semibold uppercase p-4 w-full truncate">${category.name}</h2> 
                        <div class="ofm-category__items"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");
};

const menuDesignFour = ({ products, categories }) => {

    let categoriesHTML =  categories
        .map((category) => {
            let cat = "";
            let prod = "";

            prod = products[category.uid]
                .map((product) => {
                    let html = "";

                    html += `<div class="ofm-product flex flex-shrink-0 p-2 md:p-4">`;

                    // product content
                    html += `<div class="w-full flex flex-col">`;

                    //product name
                    html += `<div class="font-bold mb-2 text-2xl line-clamp-2">${product.name}</div>`;

                    //productTags && Allergens
                    if (product.tags?.length || product.allergens?.length) {
                        html += `<div class="flex gap-2 overflow-x-auto overflow-hidden max-w-full py-4">`;
                        html += allergensHTML(product.allergens);
                        html += tagsHTML(product.tags);
                        html += `</div>`;
                    }

                    //product description
                    html += `<div class="opacity-50 italic leading-tight w-full mb-2 text-lg">${product.description}</div>`;

                    html += `<div>`;
                    product.options && (html += optionsHTML(product.options));
                    html += `</div>`;
                    // product.options && (html += optionsHTML(product.options));

                    //closing tags
                    html += `</div>
                        </div>`;

                    return html;
                })
                .join("");

            cat += `
                    <div class="ofm-category my-20 first:mt-10 max-w-[768px] mx-auto" data-category>
                        <h2 class="ofm-category__title text-center text-2xl md:text-3xl mb-6 font-semibold uppercase bg-gray-50 border border-gray-400 p-4">${category.name}</h2> 
                        <div class="ofm-category__items"> ${prod} </div>
                    </div>`;
            return cat;
        })
        .join("");

    return `<div class="bg-white p-4 shadow rounded-md">${categoriesHTML}</div>`;
};

