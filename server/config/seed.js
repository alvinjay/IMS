/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model'),
    User = require('../api/user/user.model'),
    Incident = require('../api/incident/incident.model'),
    Officer = require('../api/officer/officer.model');

//Thing.find({}).remove(function() {
//  Thing.create({
//    name : 'Development Tools',
//    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//  }, {
//    name : 'Server and Client integration',
//    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//  }, {
//    name : 'Smart Build System',
//    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//  },  {
//    name : 'Modular Structure',
//    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//  },  {
//    name : 'Optimized Build',
//    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//  },{
//    name : 'Deployment Ready',
//    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//  });
//});
//
//User.find({}).remove(function() {
//  User.create({
//    provider: 'local',
//    name: 'Test User',
//    email: 'test@test.com',
//    password: 'test'
//  }, {
//    provider: 'local',
//    role: 'admin',
//    name: 'Admin',
//    email: 'admin@admin.com',
//    password: 'admin'
//  }, function() {
//      console.log('finished populating users');
//    }
//  );
//});
//
//  Incident.create({
//      id: '1',
//      type: 'Theft',
//      sender: {
//        name: 'Alvin Jay',
//        contact: '09123456789'
//      },
//      location: {
//        type: "Point",
//        coordinates: [125.49925088882446,7.10698777582003]
//      },
//      timestamp: 1419831587298,
//      attachment: {
//        img: ''
//      }
//    },{
//      id: '2',
//      type: 'Murder',
//      sender: {
//        name: 'Louie',
//        contact: '09987654321'
//      },
//      location: {
//        type: "Point",
//        coordinates: [125.49845695495605,7.100637151448285]
//      },
//      timestamp: 1419831587100,
//      attachment: {
//        img: ''
//      }
//    }, function() {
//      console.log('finished populating incidents');
//    }
//  );

Officer.find({}).remove(function() {
  Officer.create({
      id: '0000',
      name: 'Alvin Jay Cosare',
      areaCode: '04',
      station: 'Mintal'
    },{
      id: '0001',
      name: 'Ariette June Guillermo',
      areaCode: '11',
      station: 'Cabantian'
    },{
      id: '0002',
      name: 'Louie Riños',
      areaCode: '03',
      station: 'Tugbok'
    },{
      id: '0003',
      name: 'Gabriel Lagmay',
      areaCode: '08',
      station: 'San Pedro'
    },{
      id: '0004',
      name: 'Marie Beth Venice Cosare',
      areaCode: '04',
      station: 'Mintal'
    },function() {
      console.log('finished populating officers');
    }
  );
});
