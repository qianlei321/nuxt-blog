<!-- 
错误页面
-->
<template>
    <div class="container error">
        <div class="text-center">
            <div class="container-error-404">
                <div class="clip">
                    <div class="shadow">
                        <span class="digit thirdDigit">4</span>
                    </div>
                </div>
                <div class="clip">
                    <div class="shadow">
                        <span class="digit secondDigit">0</span>
                    </div>
                </div>
                <div class="clip">
                    <div class="shadow">
                        <span class="digit firstDigit">4</span>
                    </div>
                </div>
            </div>
            <h2 class="h1">很抱歉，你访问的页面找不到了</h2>
            <p>
                <nuxt-link to="/" class="tohome">首 页</nuxt-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // 你可以为错误页面指定自定义的布局
}
</script>
<style>
.text-center{
  text-align: center
}
.container{
  min-height: 592px;
}
.tohome{
    font-size: 16px;
    color: #07B3F9;
    text-decoration: none;
}
.container-error-404 {
    margin-top: 10%;
    position: relative;
    height: 250px;
    padding-top: 40px;
}
.container-error-404 .clip {
    display: inline-block;
    transform: skew(-45deg);
}
.error .clip:nth-of-type(1) .shadow, .error .clip:nth-of-type(3) .shadow {
    width: 250px;
}
.error h2 {
    font-size: 24px;
    color: #A2A2A2;
    font-weight: bold;
    padding-bottom: 20px;
}
.error .clip:nth-of-type(1) .digit {
    right: -20%;
}
.error .digit {
    position: relative;
    top: 8%;
    color: white;
    background: #07B3F9;
    border-radius: 50%;
    display: inline-block;
    transform: skew(45deg);
}
.error .digit {
    width: 150px;
    height: 150px;
    line-height: 150px;
    font-size: 120px;
    font-weight: bold;
}
.error .msg {
    position: relative;
    z-index: 9999;
    display: block;
    background: #535353;
    color: #A2A2A2;
    border-radius: 50%;
    font-style: italic;
}
.error .msg {
    top: -190px;
    left: 30%;
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
}
.error .clip:nth-of-type(1) .shadow, .error .clip:nth-of-type(3) .shadow {
    width: 250px;
}
.error .clip .shadow {
    overflow: hidden;
}
.error .clip .shadow {
    height: 180px;
}
.error .clip:nth-of-type(3) .digit {
    left: -20%;
}
.error .clip:nth-of-type(3) .shadow:after {
    left: -8px;
}
.error .clip:nth-of-type(3) .shadow:after, .error .clip:nth-of-type(1) .shadow:after {
    content: "";
    position: absolute;
    right: -8px;
    bottom: 0px;
    z-index: 9999;
    height: 100%;
    width: 10px;
    background: linear-gradient(90deg, transparent, rgba(173, 173, 173, 0.8), transparent);
    border-radius: 50%;
}
:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
@media(max-width: 767px) {
    .error .clip .shadow {
        height: 100px;
    }
    .error .clip:nth-of-type(2) .shadow {
        width: 80px;
    }
    .error .clip:nth-of-type(1) .shadow,
    .error .clip:nth-of-type(3) .shadow {
        width: 100px;
    }
    .error .digit {
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 52px;
    }
    .error h2 {
        font-size: 18px;
    }
    .error .msg {
        top: -110px;
        left: 15%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
    }
    .error span.triangle {
        top: 70%;
        right: -3%;
        border-left: 10px solid #535353;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
    }
    .error .container-error-404 {
        height: 150px;
    }
}
</style>