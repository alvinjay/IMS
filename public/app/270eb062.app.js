"use strict";function IncidentsCtrl(a,b,c,d){a.dummyIncidents=[{id:"3",type:"Rape",sender:{name:"Jon",contact:"09123456789"},location:{type:"Point",coordinates:[125.49925088882446,7.10698777582003]},timestamp:1419831587298,attachment:{img:""}},{id:"4",type:"Assault",sender:{name:"Migs",contact:"09987654321"},location:{type:"Point",coordinates:[125.49845695495605,7.100637151448285]},timestamp:1419831587100,attachment:{img:""}}],a.services=d.services,a.connection=c,a.isConnected=!1,a.connection.on("value",function(c){b(function(){a.isConnected=c.val()===!0?!0:!1})}),a.$watch("isConnected",function(b){b&&a.services.retrieveRecordedIncidents()}),a.services.getIncidents().success(function(b){a.incidents=b}),a.addDummy=function(){a.services.test(a.dummyIncidents)}}function MainCtrl(a,b,c){a.services=c.services,a.services.getThings().success(function(b){a.awesomeThings=b}),a.$on("$destroy",function(){b.unsyncUpdates("thing")})}function OfficersCtrl(a,b){a.dummyOfficers=[{id:"0005",name:"Dulch Polinar",areaCode:"09",picture:"",contact:""},{id:"0006",name:"Apple Bacalso",areaCode:"06",picture:"",contact:""},{id:"0007",name:"Sarah Meh Osay",areaCode:"01",picture:"",contact:""},{id:"0008",name:"Christian Dalisay",areaCode:"12",picture:"",contact:""},{id:"0009",name:"Herzon Tan",areaCode:"12",picture:"",contact:""}],a.services=b.services,a.services.getOfficers().success(function(b){a.officers=b}),a.addDummy=function(){a.services.test(a.dummyOfficers)}}angular.module("imsCosareApp",["ngCookies","ngResource","ngSanitize","ngRoute","btford.socket-io","ui.bootstrap","firebase","blockUI"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){a.otherwise({redirectTo:"/"}),b.html5Mode(!0),c.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status?(d.path("/login"),c.remove("token"),b.reject(a)):b.reject(a)}}}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){c.isLoggedInAsync(function(a){d.authenticate&&!a&&b.path("/login")})})}]),angular.module("imsCosareApp").config(["$routeProvider",function(a){a.when("/login",{templateUrl:"app/account/login/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"app/account/signup/signup.html",controller:"SignupCtrl"}).when("/settings",{templateUrl:"app/account/settings/settings.html",controller:"SettingsCtrl",authenticate:!0})}]),angular.module("imsCosareApp").controller("LoginCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){a.errors.other=b.message})},a.loginOauth=function(a){d.location.href="/auth/"+a}}]),angular.module("imsCosareApp").controller("SettingsCtrl",["$scope","User","Auth",function(a,b,c){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."})["catch"](function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password",a.message=""})}}]),angular.module("imsCosareApp").controller("SignupCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.message})})},a.loginOauth=function(a){d.location.href="/auth/"+a}}]),angular.module("imsCosareApp").controller("AdminCtrl",["$scope","$http","Auth","User",function(a,b,c,d){a.users=d.query(),a["delete"]=function(b){d.remove({id:b._id}),angular.forEach(a.users,function(c,d){c===b&&a.users.splice(d,1)})}}]),angular.module("imsCosareApp").config(["$routeProvider",function(a){a.when("/admin",{templateUrl:"app/admin/admin.html",controller:"AdminCtrl"})}]),angular.module("imsCosareApp").constant("FIREBASE_URL","https://incident-mapper.firebaseio.com"),function(a){function b(){var a={baguio:{lat:7.172127,lng:125.403169,message:"Baguio District Police Station",draggable:!1,area:"01"},calinan:{lat:7.189411,lng:125.452304,message:"Calinan Police Station",draggable:!1,area:"02"},tugbok:{lat:7.110276,lng:125.484445,message:"Tugbok District Police Station",draggable:!1,area:"03"},mintal:{lat:7.0928,lng:125.5023,message:"Mintal Police Station",draggable:!1,area:"04"},ulas:{lat:7.055111,lng:125.546177,message:"Ulas Police Station",draggable:!1,area:"06"},toril:{lat:7.018503,lng:125.49846,message:"Toril Police Station",draggable:!1,area:"05"},talomo:{lat:7.059326,lng:125.567939,message:"Talomo Police Station",draggable:!1,area:"07"},sanpedro:{lat:7.066204,lng:125.606983,message:"San Pedro Police Station",draggable:!1,area:"08"},staana:{lat:7.073667,lng:125.624627,message:"Sta. Ana Police Station",draggable:!1,area:"09"},buhangin:{lat:7.108966,lng:125.615559,message:"Buhangin Police Station",draggable:!1,area:"10"},cabantian:{lat:7.11364,lng:125.6132,message:"Cabantian Police Station",draggable:!1,area:"11"},sasa:{lat:7.122365,lng:125.658537,message:"Sasa Police Station",draggable:!1,area:"13"},mandug:{lat:7.16532,lng:125.577037,message:"Mandug Police Station",draggable:!1,area:"12"},airport:{lat:7.143556,lng:125.654179,message:"Airport Police Station",draggable:!1,area:"14"},bunawan:{lat:7.191226,lng:125.63831,message:"Bunawan Police Station",draggable:!1,area:"15"}};return a}a.module("imsCosareApp").factory("StationsFactory",b)}(window.angular),function(a){function b(){return function(a){return"null"==a?"not available":a}}a.module("imsCosareApp").filter("checkIfNull",b)}(window.angular),function(a){function b(){return function(a){return new Date(a).toString()}}a.module("imsCosareApp").filter("convertToDateTime",b)}(window.angular),function(a){function b(a){return function(b){return a.getStationName(b)}}a.module("imsCosareApp").filter("determineStationName",b),b.$inject=["StationsService"]}(window.angular),angular.module("imsCosareApp").controller("IncidentsCtrl",IncidentsCtrl),IncidentsCtrl.$inject=["$scope","$timeout","connection","IncidentsService"],angular.module("imsCosareApp").config(["$routeProvider",function(a){a.when("/incidents",{templateUrl:"app/incidents/incidents.html",controller:"IncidentsCtrl",resolve:{connection:["FirebaseService",function(a){return a.getConnection()}]}})}]),angular.module("imsCosareApp").controller("MainCtrl",MainCtrl),MainCtrl.$inject=["$scope","socket","ThingsService"],angular.module("imsCosareApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("imsCosareApp").controller("OfficersCtrl",OfficersCtrl),OfficersCtrl.$inject=["$scope","OfficersService"],angular.module("imsCosareApp").config(["$routeProvider",function(a){a.when("/officers",{templateUrl:"app/officers/officers.html",controller:"OfficersCtrl"})}]),function(a){function b(a,b,c){function d(a){return new Firebase(c+a)}function e(a){return b(a).$asObject()}function f(a){return b(a).$asArray()}function g(){return new Firebase(n)}function h(){return new Firebase(n)}function i(a){return new Firebase(OFFICERS_URL+a)}function j(a,b){return a.$save(b)}function k(b){var c=a.defer();return c.resolve(++b),c.promise}function l(b){var c=a.defer();return c.resolve(--b),c.promise}var m=this;m.connection={firebase:!1};var n=c+"/.info/connected",o={connection:m.connection,getRef:d,getObject:e,getArray:f,getConnection:g,checkConnection:h,getOfficerRef:i,saveFirebaseArray:j,incrementCount:k,decrementCount:l};return o}a.module("imsCosareApp").service("FirebaseService",b),b.$inject=["$q","$firebase","FIREBASE_URL"]}(window.angular),function(a){function b(a,b,c,d,e){function f(){return c.get("/api/incidents")}function g(a){c.post("/api/incidents",a)}function h(a){c["delete"]("/api/incidents/"+a.id)}function i(a){c.put("/api/incidents/"+a.id)}function j(){d.show("Retrieving data from server");var a=e.getRef("/recorded");n.incidents.recorded=e.getArray(a),n.incidents.recorded.$loaded(function(){d.close()}),n.incidents.recorded.$watch(m)}function k(a){d.show("Saving to MongoDB"),_(a).forEach(function(a){g(a)}),d.close()}function l(a){return{id:a.$id,officerId:a.officerId,type:a.type,sender:a.sender,timestamp:a.timestamp,location:{type:"Point",coordinates:[a.l[1],a.l[0]]},areaCode:a.areaCode,attachment:a.attachment}}function m(a){if("count"!==a.key){var b=n.incidents.recorded.$getRecord(a.key);g(l(b)),n.incidents.recorded.$remove(b)}else n.size=n.incidents.recorded.$getRecord(a.key);++n.count===n.size&&(n.size.$value=0,n.incidents.recorded.$save(n.size),n.count=0,d.close())}var n=this;n.incidents={recorded:null},n.count=0,n.services={getIncidents:f,createIncident:g,deleteIncident:h,updateIncident:i,retrieveRecordedIncidents:j,test:k}}a.module("imsCosareApp").service("IncidentsService",b),b.$inject=["$q","$timeout","$http","LoadingService","FirebaseService"]}(window.angular),function(a){function b(a){function b(b){a.start(),a.message(b)}function c(){a.stop()}var d={show:b,close:c};return d}a.module("imsCosareApp").service("LoadingService",b),b.$inject=["blockUI"]}(window.angular),function(a){function b(a,b,c,d){function e(){return c.get("/api/officers")}function f(a){c.post("/api/officers",a)}function g(a){c["delete"]("/api/officers/"+a.id)}function h(a){c.put("/api/officers/"+a.id)}function i(a){d.show("Saving to MongoDB"),_(a).forEach(function(a){f(a)}),d.close()}var j=this;j.services={getOfficers:e,createOfficer:f,deleteOfficer:g,updateOfficer:h,test:i}}a.module("imsCosareApp").service("OfficersService",b),b.$inject=["$q","$timeout","$http","LoadingService"]}(window.angular),function(a){function b(a,b,c,d){function e(a){return _.findKey(d,function(b){return b.area===a})}var f=this,g={stations:f.stations,getStationName:e};return g}a.module("imsCosareApp").service("StationsService",b),b.$inject=["$q","$timeout","$http","StationsFactory"]}(window.angular),function(a){function b(a,b,c){function d(){return c.get("/api/things")}function e(a){""!==a&&c.post("/api/things",{name:a})}function f(a){c["delete"]("/api/things/"+a._id)}var g=this;g.services={getThings:d,createThing:e,deleteThing:f}}a.module("imsCosareApp").service("ThingsService",b),b.$inject=["$q","$timeout","$http"]}(window.angular),angular.module("imsCosareApp").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(a,b,c,d,e,f){var g={};return e.get("token")&&(g=d.get()),{login:function(a,b){var h=b||angular.noop,i=f.defer();return c.post("/auth/local",{email:a.email,password:a.password}).success(function(a){return e.put("token",a.token),g=d.get(),i.resolve(a),h()}).error(function(a){return this.logout(),i.reject(a),h(a)}.bind(this)),i.promise},logout:function(){e.remove("token"),g={}},createUser:function(a,b){var c=b||angular.noop;return d.save(a,function(b){return e.put("token",b.token),g=d.get(),c(a)},function(a){return this.logout(),c(a)}.bind(this)).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.changePassword({id:g._id},{oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},getCurrentUser:function(){return g},isLoggedIn:function(){return g.hasOwnProperty("role")},isLoggedInAsync:function(a){g.hasOwnProperty("$promise")?g.$promise.then(function(){a(!0)})["catch"](function(){a(!1)}):a(g.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===g.role},getToken:function(){return e.get("token")}}}]),angular.module("imsCosareApp").factory("User",["$resource",function(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("imsCosareApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("imsCosareApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),angular.module("imsCosareApp").controller("NavbarCtrl",["$scope","$location","Auth",function(a,b,c){a.menu=[{title:"Home",link:"/"},{title:"Incidents",link:"/incidents"},{title:"Officers",link:"/officers"}],a.isCollapsed=!0,a.isLoggedIn=c.isLoggedIn,a.isAdmin=c.isAdmin,a.getCurrentUser=c.getCurrentUser,a.logout=function(){c.logout(),b.path("/login")},a.isActive=function(a){return a===b.path()}}]),angular.module("imsCosareApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]),angular.module("imsCosareApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p><p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password required></div><div class="form-group has-error"><p class=help-block ng-show="form.email.$error.required && form.password.$error.required && submitted">Please enter your email and password.</p><p class=help-block ng-show="form.email.$error.email && submitted">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Login</button> <a class="btn btn-default btn-lg btn-register" href=/signup>Register</a></div><hr><div><a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')"><i class="fa fa-google-plus"></i> Connect with Google+</a></div></form></div></div><hr></div>'),a.put("app/account/settings/settings.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class="btn btn-lg btn-primary" type=submit>Save changes</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class="{ \'has-success\': form.name.$valid && submitted,\n                                            \'has-error\': form.name.$invalid && submitted }"><label>Name</label><input name=name class=form-control ng-model=user.name required><p class=help-block ng-show="form.name.$error.required && submitted">A name is required</p></div><div class=form-group ng-class="{ \'has-success\': form.email.$valid && submitted,\n                                            \'has-error\': form.email.$invalid && submitted }"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show="form.email.$error.email && submitted">Doesn\'t look like a valid email.</p><p class=help-block ng-show="form.email.$error.required && submitted">What\'s your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class="{ \'has-success\': form.password.$valid && submitted,\n                                            \'has-error\': form.password.$invalid && submitted }"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show="(form.password.$error.minlength || form.password.$error.required) && submitted">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Sign up</button> <a class="btn btn-default btn-lg btn-register" href=/login>Login</a></div><hr><div><a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')"><i class="fa fa-google-plus"></i> Connect with Google+</a></div></form></div></div><hr></div>'),a.put("app/admin/admin.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class=list-group><li class=list-group-item ng-repeat="user in users"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class="glyphicon glyphicon-trash pull-right"></span></a></li></ul></div>'),a.put("app/incidents/incidents.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><button class="btn btn-success" type=submit ng-click=addDummy()>Add Dummy Data</button><br><br><label for=search>Search</label><input id=search data-ng-model="searchKeyword"></div><div class=row><div class=col-lg-12><h1 class=page-header>Incidents:</h1><table class=table><tr><th>ID</th><th>Type</th><th>Officer<!--TODO--></th><th>Date and Time</th><th>Action</th></tr><tr ng-repeat="incident in incidents  | filter: searchKeyword "><td>{{incident.id}}</td><td>{{incident.type}}</td><td>{{incident.sender.name}}</td><td>{{incident.timestamp | convertToDateTime}}</td><td><div class=btn-group role=group aria-label=...><button type=button data-toggle=tooltip data-placement=left title="View Details" class="btn btn-default"><i class="fa fa-folder-open"></i></button> <button type=button data-toggle=tooltip data-placement=top title="Edit Record" class="btn btn-default"><i class="fa fa-edit"></i></button> <button type=button data-toggle=tooltip data-placement=right title="Remove Record" class="btn btn-default" ng-click=removeRow(company.name)><i class="fa fa-trash"></i></button></div></td></tr></table></div></div></div><footer class=footer><div class=container><p>Angular Fullstack v2.0.13 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div></footer>'),a.put("app/main/main.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><header class=hero-unit id=banner><div class=container><h1>\'Allo, \'Allo!</h1><p class=lead>Kick-start your next web app with Angular Fullstack</p><img src=assets/images/d535427a.yeoman.png alt="I\'m Yeoman"></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Features:</h1><ul class="nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6" ng-repeat="thing in awesomeThings"><li><a href=# tooltip={{thing.info}}>{{thing.name}}<button type=button class=close ng-click=services.deleteThing(thing)>&times;</button></a></li></ul></div></div><form class=thing-form><label>Syncs in realtime across clients</label><p class=input-group><input class=form-control placeholder="Add a new thing here." ng-model=newThing> <span class=input-group-btn><button type=submit class="btn btn-primary" ng-click="services.createThing(newThing); newThing = \'\'">Add New</button></span></p></form></div><footer class=footer><div class=container><p>Angular Fullstack v2.0.13 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div></footer>'),a.put("app/officers/officers.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><button class="btn btn-success" type=submit ng-click=addDummy()>Add Dummy Data</button><br><br><label for=search>Search</label><input id=search data-ng-model="searchKeyword"></div><div class=row><div class=col-lg-12><h1 class=page-header>Officers:</h1><table class=table><tr><th>ID</th><th>Name</th><th>Contact</th><th>Station</th><th>Action</th></tr><tr ng-repeat="officer in officers  | filter: searchKeyword "><td>{{officer.id}}</td><td>{{officer.name}}</td><td>{{officer.contact}}</td><td>{{officer.areaCode | determineStationName}}</td><td><div class=btn-group role=group aria-label=...><button type=button data-toggle=tooltip data-placement=left title="View Details" class="btn btn-default"><i class="fa fa-folder-open"></i></button> <button type=button data-toggle=tooltip data-placement=top title="Edit Record" class="btn btn-default"><i class="fa fa-edit"></i></button> <button type=button data-toggle=tooltip data-placement=right title="Remove Record" class="btn btn-default" ng-click=removeRow(company.name)><i class="fa fa-trash"></i></button></div></td></tr></table></div></div></div><footer class=footer><div class=container><p>Angular Fullstack v2.0.13 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div></footer>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>ims-cosare</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li><!--<li ng-show="isAdmin()" ng-class="{active: isActive(\'/admin\')}"><a href="/admin">Admin</a></li>--><!--<li ng-show="isAdmin()" ng-class="{active: isActive(\'/incidents\')}"><a href="/incidents">Incidents</a></li>--><!--<li ng-show="isAdmin()" ng-class="{active: isActive(\'/officers\')}"><a href="/officers">Officers</a></li>--></ul><ul class="nav navbar-nav navbar-right"><li ng-hide=isLoggedIn() ng-class="{active: isActive(\'/signup\')}"><a href=/signup>Sign up</a></li><li ng-hide=isLoggedIn() ng-class="{active: isActive(\'/login\')}"><a href=/login>Login</a></li><li ng-show=isLoggedIn()><p class=navbar-text>Hello {{ getCurrentUser().name }}</p></li><li ng-show=isLoggedIn() ng-class="{active: isActive(\'/settings\')}"><a href=/settings><span class="glyphicon glyphicon-cog"></span></a></li><li ng-show=isLoggedIn() ng-class="{active: isActive(\'/logout\')}"><a href="" ng-click=logout()>Logout</a></li></ul></div></div></div>')}]);