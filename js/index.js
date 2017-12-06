$(function () {
    $(document).ajaxSend(function () {
        $('.content ,#add').hide();
        $('#loading').show();
    });
    $(document).ajaxSuccess(function () {
        $('.content ,#add').show();
        $('#loading').hide();
    });

//封装新闻函数
    var index1=0;
    var arr2=[];
    function reader(type,repaint=true,start=0) {
        $.ajax({
            url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=10&appkey=729d41dab5c94eae",
            dataType:'jsonp',
            success:function (res) {
                let arr = res.result.list;
                let str = "";


                arr.forEach((val) => {
                    let arr1 = [];
                    if (val.pic == "") {

                        str += `<li class="list" id=${index1}   >
                                <a href="../particulars.html" class="xqa" >
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                        arr1.push("" + val.content + "")
                    }
                    else {
                        str += `<li class="list" id="${index1}">
                                <a href="../particulars.html" class="xqa" >
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;

                        arr1.push("" + val.content + "");
                    }
                    arr2.push(arr1)
                    index1++;
                })


                //点击获取新闻内容
                $('.content').on('click', '.list', function (e) {
                    e.preventDefault();

                    var index = $('.list').index($(this));
                    // console.log(index);
                    $('.content').html(arr2[index]);

                    localStorage.channel=res.result.channel;
                    localStorage.indexs=index;
                    location.href="particulars.html";

                })

                if (repaint) {
                    $('.content').html(str);

                } else {
                    $('.content').html($('.content').html() + str);

                }
            }
        })
    }

    $.ajax({
        url:'https://api.jisuapi.com/news/channel?appkey=729d41dab5c94eae',
        dataType:'jsonp',
        success:function (res) {
            let arr = res.result;
            let str = "";
            arr.forEach((val, index) => {
                if(index == 0)
                {
                    str += `<li class="active">${val}</li>`;

                }
                else
                {
                    str += `<li>${val}</li>`;
                }
            })
            $('#scroller ul').html(str);
            //执行render重绘页面
            reader($('#scroller li.active').text());
        }
    });


    $('#scroller').on('click','li',function () {
        if($(this).hasClass('active')){
            return;
        }
        arr2=[];
        $(this).siblings().removeClass('active').end().addClass('active');
        let text =$(this).html();
        reader(text);
    })

    $('#add').click(function () {
        render($('#scroller li.active').html(),false,$(".content").children("li").length);
    })

    $('#search input').click(function () {
        location.href='search.html'
    })


})