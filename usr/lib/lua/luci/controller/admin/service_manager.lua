module("luci.controller.admin.service_manager", package.seeall)  --notice that new_tab is the name of the file new_tab.lua
 function index()
     entry({"admin", "service_manager"}, firstchild(), "Page service", 60).dependent=false  --this adds the top level tab and defaults to the first sub-tab (tab_from_cbi), also it is set to position 30
        
     entry({"admin", "service_manager", "tab_from_view"}, template("service_manager/service_list"), "Liste des services", 2)  --this adds the second sub-tab that is located in <luci-path>/luci-myapplication/view/myapp-mymodule and the file is called view_tab.htm, also set to the second position
end