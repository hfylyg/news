$(function () {
    $('#search span').click(function () {
        history.back();
    });



    let search="";
    let arr=[];
    if(localStorage.history){
       search=localStorage.history;
       arr=search.split(',');
       arr.shift();
       arr=arr.slice(-5);
        let str="";
        arr.forEach(val=>{
            str+=`<span>${val}</span>`;
        })
        $('#history').html(str);

    }



    $('#record').on('click', 'span', function () {
        let thisa = $(this).text()
        console.log(thisa);
        $.ajax({
            url: "https://api.jisuapi.com/news/search?keyword=" + thisa + "&appkey=729d41dab5c94eae",
            dataType: 'jsonp',
            beforeSend: function () {
                $('#loading').show()
                $('#record').hide()
            },
            success: function (res) {
                $('#loading').hide()
                $('#record').hide()
                let arr = res.result.list;

                let str = '';
                arr.forEach(val => {
                    if(val.pic == ""){
                        str += `<li class="list" >
                                    <a >
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }
                    else{
                        str += `<li class="list">
                                <a >
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                             </li>`;
                    }
                })
                $('#content').html(str);
                //点击内容后调整详情页2
                /* $('.content').on('click', '.list', function () {
                     let indexsa = $('.list').index(this)
                     console.log(indexsa)
                     localStorage.val = thisa;
                     localStorage.indexsa = indexsa;
                     location.href = 'particulars2.html'
                 })*/
            }
        })


    });











    $('.search').blur(function(){
        let val=$(this).val();
        if( val==""){
            return;
        }
        else{

            $(this).val("");
            $('<span></span>').html(`${val}`).appendTo('#history');
            search+=","+val;
            localStorage.history=search;
            let arr=localStorage.history.split(",");

            arr.shift();
            arr=arr.splice(-5);
            let str = '';
            arr.forEach(val => {
                str+= `<span>${val}</span>`
            })
            $('.history').html(str);
        }

        $.ajax({

            url: "https://api.jisuapi.com/news/search?keyword=" + val + "&appkey=3732400a5ce14b54",
            dataType: 'jsonp',
            beforeSend: function () {
                $('#loading').show();
                $('#history').hide();

            },
            success: function (res) {

                // let arr1 = res.result.list;
                $('#loading').hide();
                $('#history').hide();
                let arr = res.result.list;

                let str = '';
                arr.forEach((val, index) => {
                    if(val.pic == ""){
                        str += `<li class="list" >
                                    <a >
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }
                    else{
                        str += `<li class="list">
                                <a>
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                             </li>`;
                    }
                })
                $('#content').html(str);

            },
        });


    })
    
    $('#history span').click(function () {
        let val=$(this).html();
        $.ajax({

            url: "https://api.jisuapi.com/news/search?keyword=" + val + "&appkey=3732400a5ce14b54",
            dataType: 'jsonp',
            beforeSend: function () {
                $('#loading').show();
                $('#history').hide();
            },
            success: function (res) {

                // let arr1 = res.result.list;
                $('#loading').hide();
                $('#history').hide();
                let arr = res.result.list;

                let str = '';
                arr.forEach((val, index) => {
                    if(val.pic == ""){
                        str += `<li class="list" >
                                    <a >
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }
                    else{
                        str += `<li class="list">
                                <a>
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                             </li>`;
                    }
                })
                $('#content').html(str);

            },
        });
    })



})