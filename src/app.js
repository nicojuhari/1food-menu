import { createMenuHTML } from "./templates";
import { events } from "./events";

export const createMenu = ({ menu, version = 1, priceSymbol = "", }) => {

    // tests if global scope is bound to window
    if (!isBrowser()) return;

    const nodeEl = document.getElementById("1FoodMenu");
    
    //validate
    if (nodeEl == null) return;
    if(Object.entries(menu).length == 0 || menu?.products?.length == 0 || menu?.categories?.length == 0) return;

    //create global object
    window.__OneFoodMenuData__ = {
        products: menu.products,
        categories: menu.categories,
        menuNode: nodeEl,
        version,
        priceSymbol,
    };

    if ([1,2].includes(version)) {
        // create modalDiv
        if (document.getElementById("#1FoodMenuModal") == null) {

            let modalDiv = document.createElement("div");
            modalDiv.className = "modal-wrapper";
            modalDiv.id = "1FoodMenuModal";

            nodeEl.parentNode.insertBefore(modalDiv, nodeEl.nextSibling);
            __OneFoodMenuData__.modalNode = modalDiv;
        }
    }

    if(version == 3 ) {
        let classes = ("container bg-white p-4 my-6 shadow-md rounded-md").split(" ");
        classes.forEach((item) => {
            nodeEl.classList.add(item);
        });
    }

    let groupedProducts = [];
    let menuHTML = "";

    groupedProducts = productsByCategory(menu);
    menuHTML = createMenuHTML({ menu, categories: groupedProducts, version, priceSymbol });

    mountOnPage(nodeEl, menuHTML);


    //carousel
    if(version == 2) {
        import('swiper').then(({ default: Swiper, Navigation }) =>  {

            new Swiper(".mySwiper", {
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 15,
            slidesPerView: 1.3,
            breakpoints: {
                640: {
                    slidesPerView: 2.3,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
        });

        })
        
    }

    events();
};

const productsByCategory = (menu) => {
    let groupedProducts = {};

    menu.products.forEach((product) => {
        if (!groupedProducts?.[product?.categoryId]) {
            groupedProducts[product.categoryId] = [];
        }
        groupedProducts[product.categoryId].push(product);
    });

    return groupedProducts;
};

const mountOnPage = (nodeEl, html) => nodeEl.innerHTML = html;

const isBrowser = () => new Function("try {return this===window;}catch(e){ return false;}");