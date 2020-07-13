module("luci.controller.services.services", package.seeall)  --notice that new_tab is the name of the file new_tab.lua
 function index()
     entry({"admin", "services"}, firstchild(), "Services", 60).dependent=false  --this adds the top level tab and defaults to the first sub-tab (tab_from_cbi), also it is set to position 30
     entry({"admin", "services", "services_cbi"}, cbi("services/services_tab"), "paramètres", 2)  --this adds the first sub-tab that is located in <luci-path>/luci-myapplication/model/cbi/myapp-mymodule and the file is called cbi_tab.lua, also set to first position
     entry({"admin", "services", "services_view"}, template("services/services_tab"), "Tous les Services", 1)  --this adds the second sub-tab that is located in <luci-path>/luci-myapplication/view/myapp-mymodule and the file is called view_tab.htm, also set to the second position
end