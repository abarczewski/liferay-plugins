var Desktop=function(){var A=jQuery;return{initHtml:function(){var C=this;var B=A("#portlet-wrapper-password-reminder").size()+A("#portlet-wrapper-terms-of-use").size();if(C._isFreeformLayout&&!C._isStateMaximized&&(B==0)){C._handleBodyClicks()}else{C._handleAddScrollbar()}},initPage:function(){var C=this;var B=A("#portlet-wrapper-password-reminder").size()+A("#portlet-wrapper-terms-of-use").size();C._handleAddSidebar();C._handlePortletIcons();if(C._isFreeformLayout&&!C._isStateMaximized&&(B==0)){C._handleTaskbarInit();C._handlePortletClicks()}},taskbarAddPortlet:function(F){var J=this;if(A("#tb_"+F).size()==0){var I=A("#p_p_id_"+F+"_");var D=I.find("span.icon-close");var C="";if(I.hasClass("portlet-minimized")){I.css({display:"none"}).removeClass("portlet-minimized");C="javascript: Desktop.portletRestore('"+F+"');"}else{C="javascript: Desktop.portletMinimize('"+F+"');"}if(D.size()==0){C="#"}var H=A.trim(I.find("span.portlet-title").text());if(H!=""){var B="";B+="<li id=\"tb_"+F+"\" class=\"taskbar-link\">";B+="\t<a href=\""+C+"\">";B+="\t\t<span class=\"taskbar-link-title\">";B+=H;B+="\t\t</span>";B+="\t</a>";B+="</li>";A("#taskbar-portlets").append(B);var G=A("#taskbar-portlets .taskbar-link");var E=G.size();J._updateTaskbarLinks(E)}if(J._isFreeformLayout){J.portletRestore(F)}}},taskbarSelectedPortlet:function(D){var B=this;var C=A("#tb_"+D);if(C.size()>0){A(".taskbar-link.selected").removeClass("selected");C.addClass("selected")}},portletMinimize:function(C){var B=this;var D=A("#tb_"+C+" a").attr("href");D=D.replace("portletMinimize","portletRestore");A("#tb_"+C+" a").attr("href",D);A("#p_p_id_"+C+"_").css({display:"none"});A.ajax({url:themeDisplay.getPathMain()+"/portal/update_layout",data:{p_l_id:themeDisplay.getPlid(),p_p_id:C,p_p_restore:false,doAsUserId:themeDisplay.getDoAsUserIdEncoded(),cmd:"minimize"}})},portletRemove:function(D,C){var B=this;A("#tb_"+D).remove();var E=A("#taskbar-portlets .taskbar-link").size()-1;if(E<1){E=1}B._updateTaskbarLinks(E);var F=A("#p_p_id_"+D+"_");F.portletProcessed=true;F.portletId=D;F.columnPos=C;Liferay.Portlet.close(F,true)},portletRestore:function(D){var B=this;var H=A("#tb_"+D+" a").attr("href");H=H.replace("portletRestore","portletMinimize");A("#tb_"+D+" a").attr("href",H);var G=A("#p_p_id_"+D+"_");var F=G.parent().attr("id");if(B._isFreeformLayout){G.appendTo("#"+F);G.css({display:""})}else{G.css({display:""})}G.find("span.portlet-icons a").removeClass("selected");var E="tb_"+D;var C=A(".taskbar-link.selected").attr("id");if((E!=C)&&B._isFreeformLayout){B.taskbarSelectedPortlet(D)}A.ajax({url:themeDisplay.getPathMain()+"/portal/update_layout",data:{p_l_id:themeDisplay.getPlid(),p_p_id:D,p_p_restore:true,doAsUserId:themeDisplay.getDoAsUserIdEncoded(),cmd:"minimize"}})},_handleAddScrollbar:function(){var B=this;A("html").css({overflow:"auto"});A("#wrapper").css({"min-width":B._minWidth+"px"})},_handleAddSidebar:function(){var B=this;var C=A("#sidebar-container");var D=A("#sidebar-link");if((C.size()>0)&&(D.size()==0)){var E="";E+="<div id=\"sidebar-link\">";E+="\t<a href=\"javascript: Sidebar.animate();\"></a>";E+="</div>";C.prepend(E).css({display:""});Sidebar.toggle("87",false)}},_handleBodyClicks:function(){var B=this;A("body").click(function(D){var C=A(D.target);if(C.is("#wrapper")){A(".taskbar-link.selected").removeClass("selected")}})},_handlePortletClicks:function(){var B=this;var C=A("div.portlet-boundary");C.click(function(F){var D=C.index(this);var E="";E=C.eq(D).attr("id");E=E.substring(0,E.length-1);E=E.replace("p_p_id_","");B.taskbarSelectedPortlet(E)})},_handlePortletIcons:function(){var B=this;A("div.portlet-boundary").find("span.portlet-icons a").hoverIntent({interval:0,timeout:0,over:function(){A(this).addClass("selected")},out:function(){A(this).removeClass("selected")}})},_handleTaskbarInit:function(){var B=this;var D=A("#content-wrapper").find("div.portlet-boundary:last");var C="";if(D.size()>0){C=D.attr("id");C=C.substring(0,C.length-1);C=C.replace("p_p_id_","");B.taskbarSelectedPortlet(C)}},_updateTaskbarLinks:function(E){var B=this;var F=A("#taskbar-portlets .taskbar-link");if(A("html").is(".ie6")){var C=A("#taskbar-portlets-wrapper").width()-A(".lfr-dock.interactive-mode").width();var D=C/E;if(D>200){D=200}else{if(D<40){D=40}}F.css({width:D+"px"})}else{F.css({width:100/E+"%"})}},_isFreeformLayout:themeDisplay.isFreeformLayout(),_isStateMaximized:themeDisplay.isStateMaximized(),_minWidth:964}}()