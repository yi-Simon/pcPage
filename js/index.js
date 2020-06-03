window.addEventListener('DOMContentLoaded', function() {

    // 商品数据
    let goodData = {
        path: [{
            title: "手机、数码、通讯",
            url: "###"
        }, {
            title: "手机",
            url: "###"
        }, {
            title: "Apple苹果",
            url: "###"
        }, {
            title: "iphone 6S系类",
        }],
        imgsrc: [
            { b: "./images/b1.png", s: "./images/s1.png" },
            { b: "./images/b2.png", s: "./images/s2.png" },
            { b: "./images/b3.png", s: "./images/s3.png" },
            { b: "./images/b1.png", s: "./images/s1.png" },
            { b: "./images/b2.png", s: "./images/s2.png" },
            { b: "./images/b3.png", s: "./images/s3.png" },
            { b: "./images/b1.png", s: "./images/s1.png" },
            { b: "./images/b2.png", s: "./images/s2.png" },
            { b: "./images/b3.png", s: "./images/s3.png" },
            { b: "./images/b1.png", s: "./images/s1.png" },
            { b: "./images/b2.png", s: "./images/s2.png" },
            { b: "./images/b3.png", s: "./images/s3.png" },
            { b: "./images/b1.png", s: "./images/s1.png" },
            { b: "./images/b2.png", s: "./images/s2.png" },
            { b: "./images/b3.png", s: "./images/s3.png" },
        ],
        goodsDetail: {
            title: "Apple iPhone 6s（A1700）64G玫瑰金色 移动通信电信4G手机",
            recommend: "推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返",
            price: 5299,
            promoteSales: {
                type: "加价购",
                content: "满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品"
            },
            support: "以旧换新，闲置手机回收 4G套餐超值抢 礼品购",
            address: "广东省 深圳市 宝安区",
            evaluateNum: 670000,
            crumbData: [{
                    "title": "选择颜色",
                    "data": [{
                            type: "金色",
                            changePrice: 0
                        },
                        {
                            type: "银色",
                            changePrice: 40
                        },
                        {
                            type: "黑色",
                            changePrice: 90
                        },
                    ]
                },
                {
                    "title": "内存容量",
                    "data": [{
                            type: "16G",
                            changePrice: 0
                        },
                        {
                            type: "64G",
                            changePrice: 300
                        },
                        {
                            type: "128G",
                            changePrice: 900
                        },
                        {
                            type: "256G",
                            changePrice: 1300
                        },
                    ]
                },
                {
                    "title": "选择版本",
                    "data": [{
                            type: "公开版",
                            changePrice: 0
                        },
                        {
                            type: "移动版",
                            changePrice: -1000
                        }
                    ]
                },
                {
                    "title": "购买方式",
                    "data": [{
                            type: "官方标配",
                            changePrice: 0
                        },
                        {
                            type: "优惠移动版",
                            changePrice: -240
                        },
                        {
                            type: "电信优惠版",
                            changePrice: -390
                        },
                    ]
                }
            ]
        }
    }


    // 动态生成路径导航
    pathNav();

    function pathNav() {
        var path = document.querySelector('.wrap .introduction .relation')
        for (var i = 0; i < goodData.path.length; i++) {
            var a = document.createElement('a')
            a.innerHTML = goodData.path[i].title;
            if (i < goodData.path.length - 1) {
                a.href = goodData.path[i].url
            }
            path.appendChild(a)
        }
    }




    imgInfo()

    // 商品图片介绍信息
    function imgInfo() {

        var images = goodData.imgsrc;
        console.log(images[0].b)

        var preview = document.querySelector('.wrap .introduction .introWrap .introArea .introductionImg')
        var imgFrame = document.querySelector('.wrap .introduction .introWrap .introArea')
        var mask = null;
        var bigImgFrame = null;
        var bigImg = null
        var bigImgId = 0

        // 鼠标进入小图显示大图相关
        preview.onmouseenter = function() {

            if (!mask) {
                // 创建蒙板
                mask = document.createElement('div')
                mask.className = 'mask';
                preview.appendChild(mask)

                // 创建大图
                bigImgFrame = document.createElement('div')
                bigImgFrame.className = 'introMagnifier'
                bigImg = document.createElement('img')
                bigImg.style.position = 'absolute'
                bigImg.src = images[bigImgId].b

                bigImgFrame.appendChild(bigImg)
                imgFrame.appendChild(bigImgFrame)

                preview.onmousemove = function(event) {
                    var offset = {
                        left: event.offsetX - mask.offsetWidth / 2,
                        top: event.offsetY - mask.offsetHeight / 2
                    }
                    if (offset.left < 0) {
                        offset.left = 0
                    } else if (offset.left > preview.offsetWidth - mask.offsetWidth) {
                        offset.left = preview.offsetWidth - mask.offsetWidth
                    }
                    if (offset.top < 0) {
                        offset.top = 0
                    } else if (offset.top > preview.offsetHeight - mask.offsetHeight) {
                        offset.top = preview.offsetHeight - mask.offsetHeight
                    }

                    mask.style.left = offset.left + 'px';
                    mask.style.top = offset.top + 'px';

                    // 根据比例显示大图
                    var scale = (preview.offsetWidth - mask.offsetWidth) / bigImgFrame.offsetWidth;
                    bigImg.style.left = -offset.left / scale + 'px';
                    bigImg.style.top = -offset.top / scale + 'px';
                }
            }
            preview.onmouseleave = function() {
                preview.removeChild(mask);
                imgFrame.removeChild(bigImgFrame);
                mask = null;
                bigImgFrame = null;
                bigImg = null;
                preview.onmousemove = null;
                preview.onmouseleave = null;
            }
        }




        // 获取元素右外边距
        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return document.defaultView.getComputedStyle(obj, null)[attr];
            }
        }




        // 获取缩略图框
        var thumbnailFrame = document.querySelector('.wrap .introduction .introWrap .introArea .introductionImgs .center')

        // 动态渲染缩略图
        for (var i = 0; i < images.length; i++) {
            var li = document.createElement('li')
            li.className = 'introMoreImg'
            var img = document.createElement('img')
            img.src = images[i].s

            li.appendChild(img)
            thumbnailFrame.appendChild(li)
        }



        // 获取缩略图
        var thumbnails = document.querySelectorAll('.wrap .introduction .introWrap .introArea .introductionImgs .center>li')
            // 获取前后按钮
        var pre = document.querySelector('.wrap .introduction .introWrap .introArea .introductionImgs .pre')
        var next = document.querySelector('.introWrap .introArea .introductionImgs .next')
        var thumbnailMR = parseInt(getStyle(thumbnails[0], 'marginRight'))
            // 缩略的显示数量
        var thumbnailsShowNumber = 5
            //可移动范围
        var moveRange = (thumbnails.length - thumbnailsShowNumber) * (thumbnails[0].offsetWidth + thumbnailMR)
            // 每次移动范围
        var perRange = (thumbnails[0].offsetWidth + thumbnailMR) * 2
        var moveLeft = 0;

        thumbnailFrame.style.transition = '0.2s linear'

        next.onclick = function() {
            var move = parseInt(thumbnailFrame.style.left) || 0
            if (moveRange + move > 0) {
                if (moveRange + move > perRange) {
                    moveLeft = move - perRange
                } else {
                    moveLeft = -moveRange
                }
            }
            thumbnailFrame.style.left = moveLeft + 'px'
        }
        pre.onclick = function() {
            var move = parseInt(thumbnailFrame.style.left) || 0
            if (move < 0) {
                if (move + perRange < 0) {
                    moveLeft = move + perRange
                } else {
                    moveLeft = 0
                }
            }
            thumbnailFrame.style.left = moveLeft + 'px'
        }

        var smImg = document.querySelector('.wrap .introduction .introWrap .introArea .introductionImg img')
        var thumbnailImg = document.querySelectorAll('.wrap .introduction .introWrap .introArea .introductionImgs .centerFrame .center img')

        // 点击切换小图路径
        for (var i = 0; i < thumbnailImg.length; i++) {
            thumbnailImg[i].onclick = function() {
                for (var i = 0; i < thumbnailImg.length; i++) {
                    if (thumbnailImg[i] == this) {
                        smImg.src = this.src
                        bigImgId = i
                    }
                }
            }
        }
    }




    goodDetails();
    // 动态生成购买区域
    function goodDetails() {
        var str = `<h3 class="infoName">${goodData.goodsDetail.title}</h3>
        <p class="news">${goodData.goodsDetail.recommend}</p>
        <div class="priceArea">
            <div class="priceAreal">
                <div class="priceTitle">价格</div>
                <div class="price">
                    <i>￥</i>
                    <em>${goodData.goodsDetail.price}</em>
                    <a href="###">降价通知</a>
                </div>
                <div class="remark">
                    <i>累计评价</i>
                    <span>${goodData.goodsDetail.evaluateNum}</span>
                </div>
            </div>
            <div class="notice">
                <div class="noticeTitle">促销</div>
                <div class="noticeInfo">
                    <i>${goodData.goodsDetail.promoteSales.type}</i>
                    <span>${goodData.goodsDetail.promoteSales.content}</span>
                </div>
            </div>
        </div>
        <div class="support">
            <div class="supporter">
                <div>支持</div>
                <span>${goodData.goodsDetail.support}</span>
            </div>
            <div class="address">
                <div class="info">配送至</div>
                <div class="addr"> ${goodData.goodsDetail.address} </div>
            </div>
        </div>
        <div class="choose">
            <ul class="screenNode"></ul>
        </div>
        <div class="appenCar">
            <div class="cart">
                <input type="text">
                <a href="###" class="plus">+</a>
                <a href="###" class="minus">-</a>
            </div>
            <button><span>加入购物车</span></button>
        </div>`
        var buyInfo = document.querySelector('.wrap .infoWrap .infol')
        buyInfo.innerHTML = str
    }
    choose();
    // 商品选择信息
    function choose() {

        var dataList = document.querySelector('.wrap .infoWrap .choose')

        // 数据渲染
        goodData.goodsDetail.crumbData.forEach(function(item) {

            var dl = document.createElement('dl')
            var dt = document.createElement('dt')
            dt.innerHTML = item.title
            dl.appendChild(dt)
            item.data.forEach(function(item) {
                var dd = document.createElement('dd')
                dd.innerHTML = item.type
                dd.setAttribute("extraPrice", item.changePrice)
                dl.appendChild(dd)
            })
            dataList.appendChild(dl)
        })

        // 创建选择存储数组
        var screen = new Array(goodData.goodsDetail.crumbData.length)
        screen.fill(0)

        var dlList = document.querySelectorAll('.wrap .infoWrap .choose dl')


        for (var i = 0; i < dlList.length; i++) {
            // 标记dl
            dlList[i].index = i;
            (function(i) {
                var ddList = dlList[i].getElementsByTagName('dd')
                for (var i = 0; i < ddList.length; i++) {
                    // 添加dd点击事件
                    ddList[i].onclick = function() {
                        for (var i = 0; i < ddList.length; i++) {
                            ddList[i].style.color = '#666';
                        }
                        this.style.color = 'red'

                        // 将被点击内容存储到数组
                        screen[this.parentNode.index] = this

                        var screenNode = document.querySelector('.wrap .infoWrap .choose .screenNode')
                            // 清空选中信息
                        screenNode.innerHTML = ''

                        totalPrice();
                        // 创建选中内容
                        screen.forEach(function(item, index) {
                            if (item) {
                                var mark = document.createElement('mark')
                                mark.innerHTML = item.innerHTML
                                var a = document.createElement('a')
                                a.innerHTML = 'X'
                                    // 标记标签
                                a.setAttribute('num', index)
                                mark.appendChild(a)
                                screenNode.appendChild(mark)
                            }
                        })

                        var del = document.querySelectorAll('.wrap .infoWrap .choose .screenNode mark a')

                        // 删除选中内容
                        for (var i = 0; i < del.length; i++) {
                            del[i].onclick = function() {
                                // 从标记读取下标
                                var delNum = this.getAttribute('num')
                                this.parentNode.remove()

                                // 根据下标重置对应的dl
                                var delDl = dlList[delNum].querySelectorAll('dd')
                                for (var i = 0; i < delDl.length; i++) {
                                    delDl[i].style.color = '#666'
                                }
                                delDl[0].style.color = 'red'

                                // 重置数组对应下标的内容
                                screen[delNum] = 0
                                totalPrice();
                            }
                        }

                    }
                }
            })(i)
        }

        // 计算总价
        function totalPrice() {
            var price = document.querySelector('.wrap .infoWrap .priceArea .priceAreal .price em')
            var num = document.querySelector('.wrap .infoWrap .appenCar .cart input')

            var number = num.value
            var unitPrice = goodData.goodsDetail.price


            for (var i = 0; i < screen.length; i++) {
                if (screen[i] !== 0) {
                    var p = screen[i].getAttribute('extraprice')
                    unitPrice += parseInt(p)
                }
            }
            var finalPrice = unitPrice * number
            price.innerHTML = finalPrice
        }

    }

    buyNumber();
    // 购买数量加减
    function buyNumber() {
        var plus = document.querySelector('.wrap .infoWrap .appenCar .cart .plus')
        var minus = document.querySelector('.wrap .infoWrap .appenCar .cart .minus')
        var nums = document.querySelector('.wrap .infoWrap .appenCar .cart input')
        var price = document.querySelector('.wrap .infoWrap .priceArea .priceAreal .price em')
        var finalPrice = parseInt(price.innerHTML)
        nums.value = 1
        var num = 1

        plus.onclick = function() {

            finalPrice = (finalPrice / num++) * num

            price.innerHTML = finalPrice
            nums.value = num


        }

        minus.onclick = function() {
            if (num > 1) {
                finalPrice = (finalPrice / num--) * num

                price.innerHTML = finalPrice
                nums.value = num
            }
        }

        nums.onchange = function() {
            num = nums.value
        }
    }




})