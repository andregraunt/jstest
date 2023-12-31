 $(function(){
                //var radius = $(window).width()/3;//半径
                var sum = 8;
                var loterry;//中奖的index
                var minRotate = 2160;//最少转动角度
                var rotate = 0;
                var duration = 5;
                var $items = $(".circle p");
                var light = 0;
                var showTime,loterryTime,bubblesInterval;
                //var borderWidth = radius*Math.tan(360/sum/2*Math.PI/180);
               // $(".circle").css("width",radius*2+"px").css("height",radius*2+"px");
                $(".circle p").each(function(){
                   // $(this).css("border-width",radius+"px "+borderWidth+"px 0px "+borderWidth+"px");
                    //$(this).css("left",radius-borderWidth+"px");
                    var jiao = $(this).index()*360/sum;
                    $(this).css("transform","rotate("+jiao+"deg)");
                    //$(this).css("transform-origin",borderWidth+"px "+radius+"px");
                });
                $(".button").click(function(){
                    $(this).addClass("disabled");
                    loterry = Math.floor(Math.random()*sum);
                    rotate = rotate-rotate%360+minRotate+360-loterry*360/sum;//需要转动的角度
                    $(".circle").css("transform","rotate("+rotate+"deg)");
                    $(".circle").css("transition-duration",duration+"s");
                    $("body").addClass("playing");
                    setTimeout(function(){
                        if($items.eq(loterry).attr('data-lottery')){
                            dialog(true,"恭喜你中了"+$items.eq(loterry).attr('data-lottery')+"等奖");
                        }else{
                            dialog(true,"很遗憾你没有中奖");
                        }
                        bubblesInterval&&clearInterval(bubblesInterval);
                        $(".button").removeClass("disabled");
                        $("body").removeClass("playing");
                    },duration*1000);
                    setTimeout(function(){
                        $("body").addClass("animate");
                    },1000);
                    setTimeout(function(){
                        $("body").removeClass("animate");
                    },duration*1000-1000);
                    loterryLight();
                    bubbles();
                });
                function show(){
                    loterryTime&&clearInterval(loterryTime);
                    bubblesInterval&&clearInterval(bubblesInterval);
                    showTime = setInterval(function(){
                        light = light%sum;
                        $items.removeClass("light");
                        $items.eq(light).addClass("light");
                        $items.eq((light+sum/2)%sum).addClass("light");
                        light++;
                    },500);
                }
                show();
                function loterryLight(){
                    showTime&&clearInterval(showTime);
                    var step;//到达中奖的区域 需要移动的步数
                    if(light>=loterry){
                        step = loterry+sum-light;
                    }else{
                        step = loterry-light;
                    }
                    var stepAll = step+3*sum;
                    var time = (duration*1000-500)/stepAll;
                    lightAnimate(time,stepAll)();
                }
                function bubbles(){
                    var $bubbles = $(".bubbles span");
                    var index = 0;
                    bubblesInterval = setInterval(function(){
                        index = index%($bubbles.length);
                        $bubbles.removeClass("light");
                        $bubbles.eq(index).addClass("light");
                        index++;
                    },1.5/12*1000);
                }
                function lightAnimate(time,stepAll){
                    var step = 0,lightInterval;
                    return function(){
                        lightInterval = setInterval(function(){
                            light = light%sum;
                            $items.removeClass("light");
                            $items.eq(light).addClass("light");
                            if(step == stepAll){//已经转动到了中奖项
                                clearInterval(lightInterval);
                            }
                            light++;
                            step++;
                        },time);
                    };
                }
                $(".dialog button").click(function(){
                    dialog(false);
                });
                function dialog(bool,txt){
                    if(bool){
                        $(".dialog").removeClass("hide").addClass("show").find("p").html(txt);
                    }else{
                        $(".dialog").removeClass("show").addClass("hide");
                    }
                }
            });