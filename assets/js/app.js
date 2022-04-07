"use strict";
/*==== HANDLE POPUP CART ====*/
const yourCart = {
    //Lấy danh sách từ localStorage
    listProduct: localStorage.getItem('YOUR_CART') === null ? [] : JSON.parse(localStorage.getItem('YOUR_CART')),
    valueItem: [],

    //Set LocalStorage
    setLocalStore: function(value){
        return localStorage.setItem('YOUR_CART', JSON.stringify(value));
    },

    // Thêm phần tử sản phẩm từ Grid vào localStorage
    handleEventGrid: function(){
        const _this = this;
        $('.item_product_main .btn_add_cart').click(function(e){
            e.preventDefault();
            const listItem = _this.listProduct;
            let inCart = false;
            const dataItem = {
                id: $(this).parents('.item_product_main').data('id'),
                image: $(this).parents('.item_product_main').find('.image_thumb img').attr('src'),
                name: $(this).parents('.item_product_main').find('.product-name a').text(),
                price: $(this).parents('.item_product_main').find('.product-info .product-price').data('price'),
                qty: 1
            }
            for (var i = 0; i < listItem.length; ++i) {
                if (dataItem.id === listItem[i].id) {
                    listItem[i].qty++;
                    _this.setLocalStore(listItem)
                    inCart = true;
                    _this.countItemCart();
                    _this.renderCartItems();
                }
            }
            if (inCart === false) {
                listItem.unshift(dataItem);
                _this.setLocalStore(listItem);
                _this.countItemCart();
                _this.renderCartItems();
            }
            _this.showPopupCart();
            _this.itemValue();
            _this.caculator();
        })
    },
    // Thêm phần tử sản phẩm từ Quickview vào localStorage
    handleEventQuick: function(){
        const _this = this;
        $('#quick-view-product .btn_add_cart').click(function(e){
            e.preventDefault();
            const listItem = _this.listProduct;
            let inCart = false;
            const dataItem = {
                id: $(this).parents('#quick-view-product').find('.form-product').data('id'),
                image: $(this).parents('#quick-view-product').find('.large-image img').attr('src'),
                name: $(this).parents('#quick-view-product').find('.title-product').text(),
                price: $(this).parents('#quick-view-product').find('.price-box .product-price').data('price'),
                qty: parseInt($(this).parents('#quick-view-product').find('.input_number_product input').val()),
            }
            const numQty = parseInt(dataItem.qty);
            for (var i = 0; i < listItem.length; ++i) {
                if (dataItem.id === listItem[i].id) {
                    listItem[i].qty += dataItem.qty;
                    _this.setLocalStore(listItem);
                    inCart = true;
                    _this.countItemCart();
                    _this.renderCartItems();
                }
            }
            if (inCart === false) {
                listItem.unshift(dataItem);
                _this.setLocalStore(listItem);
                _this.countItemCart();
                _this.renderCartItems();
            }
            _this.showPopupCart();
            _this.itemValue();
            _this.caculator();
        })
    },

    // Đếm số sản phẩm trong giỏ hàng
    countItemCart: function() {
        let itemsCart = (JSON.parse(localStorage.getItem('YOUR_CART')));
        const countItem = this.listProduct.reduce(function(data, item) {
            return data + item.qty
        }, 0);
      itemsCart === null ?  $('.count_item_pr').text('0') : $('.count_item_pr').text(countItem);
    },

    // Render danh sách sản phẩm từ localStorage
    renderCartItems: function(){
        const cartBody = $('.cart_sidebar .evo-cart-content .cart_body');
        if(this.listProduct.length == 0){
            const cartEmpty = `<div class="cart-empty"> <span class="empty-icon"> <i class="ico ico-cart"></i> </span> <div class="btn-cart-empty"> <a class="btn btn-default cart_btn-close" href="javascript:void(0);" title="Tiếp tục mua sắm">Tiếp tục mua sắm</a> </div> </div>`;
            cartBody.html(cartEmpty);
            $('.cart-footer').addClass('d-none');
            $('.cart_btn-close').click(function(e){
                $('.wrapmenu_right').removeClass('open_sidebar_menu');
                $('.cart_sidebar').removeClass('active');
                $('.opacity_menu').removeClass('open_opacity');
            });
        }else {
            const listItem = this.listProduct.map((item, index) => {
                return `<div class="clearfix cart_product" id-cart="${item.id}">
                <a class="cart_image" href="${item.image}" title="${item.name}">
                    <img src="${item.image}" class="img-fluid" alt="${item.name}"></a>
                <div class="cart_info">
                    <div class="cart_name"><span>${item.name}</span></div>
                    <div class="row-cart-left">
                        <div class="cart_item_name">
                            <div><label class="cart_quantity">Số lượng</label>
                            <div class="input-group-btn">
                                <button class="items-count btn-minus" "><span>-</span></button>
                                <input type="text" maxlength="2" max="99" value="${item.qty}" class="input-value-item"  disabled >
                                <button class="items-count btn-plus"><span>+</span></button>
                            </div>
                            </div>
                        </div>
                        <div class="text-right cart_prices">
                            <div class="cart__price"><span class="cart__sale-price" data-price="${item.price}">${String(item.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span></div><a class="cart__btn-remove remove-item-cart" href="javascript:void(0)"  onclick="yourCart.deleteItemCarts(this)" title="Bỏ sản phẩm">Bỏ sản phẩm</a></div>
                    </div>
                </div>
            </div>`
            });
            cartBody.html(listItem.join(''));
            $('.cart-footer').removeClass('d-none');
        }
    },

    // Thao tác trên item cart
    itemValue: function(){
        const _this = this;
        const btnMinus = document.querySelectorAll('.items-count.btn-minus');
        const btnPlus = document.querySelectorAll('.items-count.btn-plus');
        btnMinus.forEach(function(btn, index){
            let listItemStore = _this.listProduct;
            btn.onclick = function(){
                const formInput = $(this).parent('.input-group-btn').find('input');
                if(listItemStore[index].qty <= 1 ){ 
                   console.log('thực hiện xóa item nhưng chưa làm dược');
                }else{
                    listItemStore[index].qty -- ;
                    formInput.attr('value', listItemStore[index].qty);
                }
                _this.setLocalStore(listItemStore);
                _this.countItemCart();
                _this.caculator();
                _this.handbleEventCart()
            }
        });

        btnPlus.forEach(function(btn, index){
            let listItemStore = _this.listProduct;
            btn.onclick = function(){
                const formInput = $(this).parent('.input-group-btn').find('input');
                const valInput = formInput.val();
                _this.valueItem = parseInt(formInput.value);
                if(parseInt(valInput) == 99 ){ 
                    return listItemStore[index].qty = 99;
                }else{
                    listItemStore[index].qty ++;
                    formInput.attr('value', listItemStore[index].qty);
                }
                _this.setLocalStore(listItemStore);
                _this.countItemCart();
                _this.caculator();
                _this.handbleEventCart()
            }
        });
    },

    // Xóa sản phẩm trong giỏ hàng
    deleteItemCarts: function (itemDele) {
        let listProduct = this.listProduct;
        const cartItem = $(itemDele).parents('.cart_product');
        let idItemCard = $(cartItem).attr('id-cart');
        // xóa phần tử trong localStorage
        let listProductLength = listProduct.length;
        for(let i = 0; i < listProductLength; ++i){
            if(listProduct[i].id == idItemCard){
                listProduct.splice(i,1);
                cartItem.remove();
                this.setLocalStore(listProduct);
                this.renderCartItems();
                this.countItemCart();
                this.caculator();
                this.itemValue();
                this.handbleEventCart();
            }
         }
    },

    // Thao tác tính toán tổng tiền giỏ hàng
    caculator: function(){
        let resultPrice = [];
        let listItems = this.listProduct;
        for(var i = 0 ;i < listItems.length; i++) {
            let totalLine = parseFloat(listItems[i].price) * listItems[i].qty;
            console.log(parseFloat(listItems[i].price));
            resultPrice.push(totalLine);
        }
        const result = resultPrice.reduce(function(result, item){
            return result + item;
        }, 0)
       console.log('total result', result);
       $('.cart_sidebar .total-price').text(String(result).replace(/(.)(?=(\d{3})+$)/g,'$1.')+'₫');
    },

    // Xử lý popup thanh toán
    handbleEventCart: function(index){
        const  _this = this;
        $('#btn-proceed-checkout').click(function(e){
            $('.cart_sidebar').removeClass('active');
            $('#checkout-modal').fadeIn("slow");
            _this.renderListCheckout();
        });
        $('.checkout_btn_close').click(function(e){
            $('#checkout-modal').hide();
            $('.opacity_menu').removeClass('open_opacity');
        });
    },

    // Render list product vào checkout
    renderListCheckout: function(){
        let listItemStore = this.listProduct;
        let resultPricePay = [];
        const countCart = $('.count_item_pr').text();
        const listPay = listItemStore.map(function(item, index){
            return `
            <div class="product-item">
                <div class="product-thumbnail">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="item-qty">${item.qty}</span>
                </div>
                <div class="product-description">
                    <span class="product-name">${item.name}</span>
                    <div class="product-price">
                        ${(parseFloat(item.price) * item.qty).toLocaleString()}₫
                    </div>
                </div>
             </div>
            `
        })
        const listPayVal = listItemStore.map(function(item, index){
            return `[SP: ${item.name} - SL: ${item.qty}]`
        })
        $('#header-item-checkout span.count_item_checkout').html(countCart);
        $('#body-item-checkout').html(listPay.join(''));
        $('#dataItemsOrder').attr('value', listPayVal.join(' -- '));
        for(var i = 0 ;i < listItemStore.length; i++) {
            let totalLine = parseFloat(listItemStore[i].price) * listItemStore[i].qty
            resultPricePay.push(totalLine)
        };
        const result = resultPricePay.reduce(function(result, item){
            return result + item
        }, 0);
        const totalPay = `
        <div class="checkkout_total">
            <div class="text-left">Thành tiền: </div>
            <div class="text-right">${(result).toLocaleString()}₫</div>
        </div>`
        $('#footer-item-checkout').html(totalPay);
        $('#dataItemsTotal').attr('value', result);
    },

    // Mở popup giỏ hàng
    showPopupCart: function (){
        $('.cart_sidebar').addClass('active');
            $('.opacity_menu').addClass('open_opacity');
            $('#quick-view-product').hide();
    },
    //Khởi chạy yourCart
    start: function(){
        this.handleEventGrid();
        this.renderCartItems();
        this.countItemCart();
        this.itemValue();
        this.caculator();
        this.handbleEventCart();
    }
    
}
$(document).ready(function ($) {
    yourCart.start();
});


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
    .then(callback)
    .catch(err =>{
        const html = '<div class="alert alert-danger col-12">Không tải được dữ liệu. Vui lòng F5 lại trang để thử lại.</div>';
        const listCol = $('.product-col-slider');
        listCol.removeClass('d-none').next('.row').html(html);
    });
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
                                                               <span class="price product-price" data-price="${product.price}">${String(product.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
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
                                                       <a title="Chi tiết" href="javascript:void(0);" class="xem_nhanh btn-circle btn_view btn right-to quick-view">
                                                           Chi tiết
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
                                                <span class="price product-price" data-price="${product.price}">${String(product.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
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
                                        <a title="Chi tiết" href="javascript:void(0);" class="xem_nhanh btn-circle btn_view btn right-to quick-view">
                                            Chi tiết
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
    yourCart.start();
    clickOpenQuickview();
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
            //Gọi lại sự kiện click thêm vào localstorage
            yourCart.handleEventQuick();
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
                            <h3 class="title-product">${objProduct.name}</h3>
                        </div>
                        <form class="quick_option form-product" id="product-actions-${objProduct.id}" data-id="${objProduct.id}">
                            <div class="custom input_number_product soluong">									
                                <a class="btn_num num_1 button button_qty" onclick="var result = document.getElementById('quantity-detail'); var qtyqv = result.value; if( !isNaN( qtyqv ) && qtyqv > 1 ) result.value--;return false;"><i class="fas fa-minus-circle"></i></a>
                                <input type="text" id="quantity-detail" name="quantity" value="1" maxlength="3" class="form-control prd_quantity">
                                <a class="btn_num num_2 button button_qty" onclick="var result = document.getElementById('quantity-detail'); var qtyqv = result.value; if( !isNaN( qtyqv )) result.value++;return false;"><i class="fas fa-plus-circle"></i></a>
                            </div>
                            <div class="quickview-info">
                                <span class="prices price-box">
                                    <span class="price product-price sale-price" data-price="${objProduct.price}">${String(objProduct.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
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
                            <h3 class="title-product">${objProduct.name}</h3>
                        </div>
                        <form class="quick_option form-product" id="product-actions-${objProduct.id}" data-id="${objProduct.id}">
                            <div class="custom input_number_product soluong">									
                            <a class="btn_num num_1 button button_qty" onclick="var result = document.getElementById('quantity-detail'); var qtyqv = result.value; if( !isNaN( qtyqv ) && qtyqv > 1 ) result.value--;return false;"><i class="fas fa-minus-circle"></i></a>
                            <input type="text" id="quantity-detail" name="quantity" value="1" maxlength="3" class="form-control prd_quantity">
                            <a class="btn_num num_2 button button_qty" onclick="var result = document.getElementById('quantity-detail'); var qtyqv = result.value; if( !isNaN( qtyqv )) result.value++;return false;"><i class="fas fa-plus-circle"></i></a>
                            </div>
                            <div class="quickview-info">
                                <span class="prices price-box">
                                    <del class="old-price">${String(objProduct.compare_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</del>
                                    <span class="price product-price sale-price" data-price="${objProduct.price}">${String(objProduct.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}₫</span>
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
            //Gọi lại sự kiện click thêm vào localstorage
            yourCart.handleEventQuick();
        }
	})
	$('.quick_btn_close').click(function(){
		$('#quick-view-product').hide();
		$('.opacity_menu').removeClass('open_opacity');
	})
}

