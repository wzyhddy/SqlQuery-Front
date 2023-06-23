
<template>
    <div id="app">
      <router-view/>
    </div>
  </template>
  
  <script>

    export default {
      name:"App",
      watch:{
        $route(to,from){
          console.log();
          if(to.path!='/login'){
  
          }
  
        }
      }
    }
  
  </script>
  
  <style>
    html, body, #app {
      font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
      height: 100%;
      padding: 0;
      margin: 0;
      font-size: 15px;
      min-width: 1289.2px;
      position:fixed;width:100%;		
  
    }
  .building{
  width:100%;		
  height:100%;			
  position:fixed;
  background-size:100% 100%;
  }
  a {
    text-decoration: none;
  }
  </style>
  