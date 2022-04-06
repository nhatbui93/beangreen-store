"use strict";


/*==== Handle Add to cart =====*/
function clickOpenCart() {
    $('.btn_add_cart').click(function(e){
        e.preventDefault();
        const id = $(this).parents('.form-product').data('id');
        console.log('click open',id);
        $('.cart_sidebar').addClass('active');
        $('.opacity_menu').addClass('open_opacity');
        $('#quick-view-product').hide();
    })
};

/* ==== Render product ==== */
function startRenders (){
    getAPI(renderProducts);
}
startRenders ();
/* ==== Get data form API ==== */
function getAPI (callback){
    const postAPI = 'https://nhatbui93.github.io/repo-json/products.json';
    fetch(postAPI)
    .then(response => response.json())
    .then(callback);
}
/* ==== Render collection ==== */
function renderProducts(arrProducts) {
    const listCol = $('.product-col-slider');
    const listColLength = listCol.length;
    for( let i = 0; i < listColLength; ++i) {
        const colName = $(listCol[i]).data('col');
        const listData = arrProducts.map(product => {
            if (product.product_col.includes(colName)){
                if (product.compare_price == 0) {
                    return `<div class="swiper-slide">
                            <div class="item_product_main" data-id="${product.id}">
                                <div class="product-loop-1 product-base">
                                    <div class="product-thumbnail">
                                        <a class="image_link image_thumb display_flex scale_hover quick-view" href="javascript:void(0);" title="${product.name}">
                                            <img class="img-fluid" src="${product.image}"
                                                alt="${product.name}">
                                        </a>
                                        </div>
                                           <div class="product-info a-center">
                                               <h3 class="product-name">
                                                   <a class="xem_nhanh quick-view" href="javascript:void(0);" title="${product.name}" tabindex="0">${product.name}</a>
                                               </h3>
                                               <div class="product-hideoff">
                                                   <div class="product-hide">
                                                       <div class="price-box clearfix">
                                                           <div class="special-price">
                                                               <span class="price product-price">${String(product.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                           <div class="product-action clearfix">
                                           <form class="variants form-nut-grid form-product" data-id="${product.id}">
                                                   <div class="group_action">
                                                       <input type="hidden" name="variantId" value="${product.id}">
                                                       <button class="btn-buy btn-cart btn btn-circle left-to btn_add_cart " title="Đặt hàng ngay">
                                                           Mua ngay
                                                       </button>
                                                       <a title="Xem ngay" href="javascript:void(0);" class="xem_nhanh btn-circle btn_view btn right-to quick-view">
                                                           Xem ngay
                                                       </a>
                                                   </div>
                                               </form>
                                           </div>
                                       </div>
                                   </div>
                        </div>`
                }else {
                    const discount = Math.round(((product.compare_price - product.price) * 100) / product.compare_price);
                    return `<div class="swiper-slide">
                    <div class="item_product_main" data-id="${product.id}">
                        <div class="product-loop-1 product-base">
                            <div class="product-thumbnail">
                                <div class="saleright ">-${discount}% </div>
                                <a class="image_link image_thumb display_flex scale_hover quick-view" href="javascript:void(0);" title="${product.name}">
                                    <img class="img-fluid" src="${product.image}"
                                        alt="${product.name}">
                                </a>
                            </div>
                            <div class="product-info a-center">
                                <h3 class="product-name">
                                    <a class="xem_nhanh quick-view" href="javascript:void(0);" title="${product.name}" tabindex="0">${product.name}</a>
                                </h3>
                                <div class="product-hideoff">
                                    <div class="product-hide">
                                        <div class="price-box clearfix">
                                            <div class="old-price">
                                                <span class="price product-price-old">
                                                ${String(product.compare_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫		
                                                </span>
                                            </div>
                                            <div class="special-price">
                                                <span class="price product-price">${String(product.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product-action clearfix">
                                <form class="variants form-nut-grid form-product" data-id="${product.id}">
                                    <div class="group_action">
                                        <input type="hidden" name="variantId" value="${product.id}">
                                        <button class="btn-buy btn-cart btn btn-circle left-to btn_add_cart " title="Đặt hàng ngay">
                                            Mua ngay
                                        </button>
                                        <a title="Xem ngay" href="javascript:void(0);" class="xem_nhanh btn-circle btn_view btn right-to quick-view">
                                            Xem ngay
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`
                }
                
            }
        })
        const html =  listData.join('') != '' ? listData.join('') : '<div class="alert alert-info">Sản phẩm đang được cập nhật. Vui lòng quay lại sau.</div>';
        $(listCol[i]).removeClass('d-none').next('.row').remove();
        $(listCol[i]).find('.swiper-wrapper').html(html);
        const nameSlider = `.product-col-${i}-slider`;
        const swiperProCol = new Swiper(nameSlider, {
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
           
                768: {
                    slidesPerView: 3,
                },
           
                1024: {
                    slidesPerView: 4,
                },
            },
            navigation: {
                nextEl: nameSlider +' .swiper-button-next',
                prevEl: nameSlider +' .swiper-button-prev',
            },
        });
    }
    clickOpenQuickview();
	clickOpenCart();
}

/*==== Handle modal popup quick view ====*/
function clickOpenQuickview() {
    getAPI(renderContentProduct);
    
};
/*==== Render content product ====*/
function renderContentProduct(arrProducts){
    $('.item_product_main .quick-view').click(function(){
        const idProduct = $(this).parents('.item_product_main').data('id');
        const objProduct = arrProducts.find(product => {
            return (product.id == idProduct)
        })
        if(objProduct == {}){
            const html = `<div class="alert alert-info">Nội dung sản phẩm đang đươc cập nhật. Vui lòng quay lại sau.</div>`
            $('#quick-view-product .popup-body').html(html);
		    $('#quick-view-product').show();
		    $('.opacity_menu').addClass('open_opacity');
            //Gọi lại sự kiện click thêm vào giỏ hàng
            $('#quick-view-product .btn_add_cart').click(function(e){
                e.preventDefault();
                const id = $(this).parents('.form-product').data('id');
                console.log('click open',id);
                $('.cart_sidebar').addClass('active');
                $('.opacity_menu').addClass('open_opacity');
                $('#quick-view-product').hide();
            })
        }else {
                const html = objProduct.compare_price == 0 ? `<div class="details-product">
                <div class="row">
                    <div class="product-left-column product-images col-12 col-xs-12 col-sm-4 col-md-6 col-lg-6 col-xl-5">
                        <div class="qvx">
                            <div class="large-image">
                                    <a class="img-product" href="${objProduct.image}" target="_blank" title="Xem ảnh">
                                        <img src=${objProduct.image}" id="product-featured-image-quickview" class="img-responsive product-featured-image-quickview img-fluid" alt="${objProduct.name}">
                                    </a>
                            </div>
                        </div> 
                    </div>
                    <div class="product-center-column product-info col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-7 details-pro">
                        <div class="group-status">
                            <h3 class="title-product">
                                ${objProduct.name}
                            </h3>
                        </div>
                        <form class="quick_option form-product" id="product-actions-${objProduct.id}" data-id="${objProduct.id}">
                            <div class="custom input_number_product soluong">									
                                <a class="btn_num num_1 button button_qty"><i class="fas fa-minus-circle"></i></a>
                                <input type="text" id="quantity-detail" name="quantity" value="1" maxlength="2" class="form-control prd_quantity">
                                <a class="btn_num num_2 button button_qty"><i class="fas fa-plus-circle"></i></a>
                            </div>
                            <div class="quickview-info">
                                <span class="prices price-box">
                                    <span class="price product-price sale-price">${String(objProduct.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
                                </span>
                                <div class="button_actions clearfix">
                                    <button class="btn_cool btn btn_base btn_add_cart">
                                        <span class="btn-content"><i class="fas fa-shopping-basket"></i> Mua ngay</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="product-description product-summary">
                            <div class="rte">${objProduct.content}</div>
                        </div>
                    </div>
                </div>
            </div>` : `<div class="details-product">
                <div class="row">
                    <div class="product-left-column product-images col-12 col-xs-12 col-sm-4 col-md-6 col-lg-6 col-xl-5">
                        <div class="qvx">
                            <div class="large-image">
                                    <a class="img-product" href="${objProduct.image}" target="_blank" title="Xem ảnh">
                                        <img src=${objProduct.image}" id="product-featured-image-quickview" class="img-responsive product-featured-image-quickview img-fluid" alt="${objProduct.name}">
                                    </a>
                            </div>
                        </div> 
                    </div>
                    <div class="product-center-column product-info col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-7 details-pro">
                        <div class="group-status">
                            <h3 class="title-product">
                                ${objProduct.name}
                            </h3>
                        </div>
                        <form class="quick_option form-product" id="product-actions-${objProduct.id}" data-id="${objProduct.id}">
                            <div class="custom input_number_product soluong">									
                                <a class="btn_num num_1 button button_qty"><i class="fas fa-minus-circle"></i></a>
                                <input type="text" id="quantity-detail" name="quantity" value="1" maxlength="2" class="form-control prd_quantity">
                                <a class="btn_num num_2 button button_qty"><i class="fas fa-plus-circle"></i></a>
                            </div>
                            <div class="quickview-info">
                                <span class="prices price-box">
                                    <del class="old-price">${String(objProduct.compare_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</del>
                                    <span class="price product-price sale-price">${String(objProduct.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
                                </span>
                                <div class="button_actions clearfix">
                                    <button class="btn_cool btn btn_base btn_add_cart">
                                        <span class="btn-content"><i class="fas fa-shopping-basket"></i> Mua ngay</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="product-description product-summary">
                            <div class="rte">${objProduct.content}</div>
                        </div>
                    </div>
                </div>
            </div>`;
            $('#quick-view-product .popup-body').html(html);
		    $('#quick-view-product').show();
		    $('.opacity_menu').addClass('open_opacity');
            //Gọi lại sự kiện click thêm vào giỏ hàng
            $('#quick-view-product .btn_add_cart').click(function(e){
                e.preventDefault();
                const id = $(this).parents('.form-product').data('id');
                console.log('click open',id);
                $('.cart_sidebar').addClass('active');
                $('.opacity_menu').addClass('open_opacity');
                $('#quick-view-product').hide();
            })
        }
	})
	$('.quick_btn_close').click(function(){
		$('#quick-view-product').hide();
		$('.opacity_menu').removeClass('open_opacity');
	})
}